from django.contrib.auth import get_user_model
from django.db.models import Q
from rest_framework import serializers
from .models import FriendRequest

User = get_user_model()



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

