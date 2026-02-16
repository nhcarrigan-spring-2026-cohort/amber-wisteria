from django.contrib.auth import authenticate, get_user_model
from django.contrib.auth.password_validation import validate_password
from django.db.models import Q
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken

from .models import FriendRequest

User = get_user_model()

class ProfileSerializer(serializers.Serializer):
    display_name = serializers.CharField(required=False, allow_blank=True)
    bio = serializers.CharField(required=False, allow_blank=True)
    allergies = serializers.CharField(required=False, allow_blank=True)


class RegisterSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=150)
    password = serializers.CharField(write_only=True, min_length=8)
    email = serializers.EmailField(required=False, allow_blank=True) # optional email

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("Username is already taken.")
        return value

    def validate_password(self, value):
        validate_password(value)
        return value

    def create(self, validated_data):
        username = validated_data["username"]
        password = validated_data["password"]
        email = validated_data.get("email", "")

        user = User(username=username, email=email)
        user.set_password(password)
        user.save()

        return user


class AuthTokensSerializer(serializers.Serializer):
    access = serializers.CharField()
    refresh = serializers.CharField()


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        user = authenticate(username=attrs["username"], password=attrs["password"])
        if not user:
            raise serializers.ValidationError("Username or password is incorrect.")
        if not user.is_active:
            raise serializers.ValidationError("Account is deactivated.")
        attrs["user"] = user
        return attrs


class MeSerializer(serializers.ModelSerializer):
    profile = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ("id", "username", "email", "profile")

    def get_profile(self, obj):
        p = getattr(obj, "profile", None)
        if not p:
            return None
        return {
            "display_name": p.display_name,
            "bio": p.bio,
            "allergies": p.allergies,
        }


def tokens_for_user(user) -> dict:
    refresh = RefreshToken.for_user(user)
    return {"refresh": str(refresh), "access": str(refresh.access_token)}

class UserSearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username")
        read_only_fields = ("id", "username") 

class FriendRequestSerializer(serializers.ModelSerializer):
    """Serializer for listing friend requests - returns detailed info"""
    sender = serializers.SerializerMethodField()
    receiver = serializers.SerializerMethodField()

    class Meta:
        model = FriendRequest
        fields = ("id", "sender", "receiver", "status", "created_at")
        read_only_fields = ("id", "sender", "receiver", "status", "created_at")
    
    def get_sender(self, obj):
        return {"id": obj.sender.id, "username": obj.sender.username}
    
    def get_receiver(self, obj):
        return {"id": obj.receiver.id, "username": obj.receiver.username}


class FriendRequestCreateSerializer(serializers.Serializer):
    """Serializer for creating a friend request with validation"""
    receiver_id = serializers.IntegerField()

    def validate_receiver_id(self, value):
        # Check if receiver exists and is active
        try:
            receiver = User.objects.get(id=value, is_active=True)
        except User.DoesNotExist:
            raise serializers.ValidationError("User not found or inactive.")
        
        # Check if trying to send request to self
        request = self.context.get("request")
        if request and request.user.id == value:
            raise serializers.ValidationError("You cannot send a friend request to yourself.")
        
        # Cache receiver to avoid duplicate query in validate()
        self.context['receiver'] = receiver
        return value

    def validate(self, attrs):
        request = self.context.get("request")
        sender = request.user
        receiver = self.context['receiver']  # Use cached receiver

        # Check if there's already an active request in either direction
        existing_request = FriendRequest.objects.filter(
            Q(sender=sender, receiver=receiver) | Q(sender=receiver, receiver=sender)
        ).first()

        if existing_request:
            if existing_request.status == FriendRequest.STATUS_ACCEPTED:
                raise serializers.ValidationError("You are already friends with this user.")
            elif existing_request.status == FriendRequest.STATUS_PENDING:
                # If there's a pending request from receiver to sender, auto-accept
                if existing_request.sender == receiver:
                    existing_request.status = FriendRequest.STATUS_ACCEPTED
                    existing_request.save()
                    attrs["auto_accepted"] = True
                    attrs["existing_request"] = existing_request
                else:
                    raise serializers.ValidationError("You already sent a friend request to this user.")
        
        attrs["receiver"] = receiver
        return attrs

    def create(self, validated_data):
        # If auto-accepted, return the existing request
        if validated_data.get("auto_accepted"):
            return validated_data["existing_request"]
        
        # Create new friend request
        request = self.context.get("request")
        friend_request = FriendRequest.objects.create(
            sender=request.user,
            receiver=validated_data["receiver"],
            status=FriendRequest.STATUS_PENDING
        )
        return friend_request


class FriendRequestRespondSerializer(serializers.Serializer):
    """Serializer for responding to a friend request (accept/reject)"""
    action = serializers.ChoiceField(choices=["accept", "reject"])


class FriendSerializer(serializers.Serializer):
    """Serializer for listing friends - returns friend user info"""
    id = serializers.IntegerField()
    username = serializers.CharField()

