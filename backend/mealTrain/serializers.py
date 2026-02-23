from rest_framework import serializers
from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model
from .models import MealTrain, MealSlot, MealTrainMembership, MealSignup

User = get_user_model()

# ---------- User Serializer (stub – replace with actual from users app) ----------
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'username']


# ---------- MealTrain Serializer ----------
class MealTrainSerializer(serializers.ModelSerializer):
    organizer = UserSerializer(read_only=True)
    organizer_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(),
        source='organizer',
        write_only=True,
        required=False,  # will default to current user in create
        help_text="ID of the organizer (defaults to current user if omitted)"
    )
    slot_count = serializers.IntegerField(source='slots.count', read_only=True)
    member_count = serializers.IntegerField(
        source='memberships.filter(status=MealTrainMembership.Status.APPROVED).count',
        read_only=True
    )

    class Meta:
        model = MealTrain
        fields = [
            'id', 'title', 'description', 'organizer', 'organizer_id',
            'beneficiary_name', 'beneficiary_address', 'beneficiary_phone',
            'beneficiary_email', 'dietary_restrictions', 'created_at',
            'slot_count', 'member_count'
        ]
        read_only_fields = ['created_at']

    def create(self, validated_data):
        # Automatically set the organizer to the current user if not provided
        if 'organizer' not in validated_data:
            validated_data['organizer'] = self.context['request'].user
        return super().create(validated_data)


# ---------- MealSlot Serializer ----------
class MealSlotSerializer(serializers.ModelSerializer):
    meal_train = serializers.PrimaryKeyRelatedField(queryset=MealTrain.objects.all())
    meal_train_detail = MealTrainSerializer(source='meal_train', read_only=True)
    signup_count = serializers.IntegerField(source='signups.count', read_only=True)

    class Meta:
        model = MealSlot
        fields = [
            'id', 'meal_train', 'meal_train_detail', 'slot_date', 'meal_type',
            'signup_count'
        ]


# ---------- MealTrainMembership Serializer ----------
class MealTrainMembershipSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    user_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(),
        source='user',
        write_only=True,
        required=False
    )
    meal_train = serializers.PrimaryKeyRelatedField(queryset=MealTrain.objects.all())
    meal_train_detail = MealTrainSerializer(source='meal_train', read_only=True)

    class Meta:
        model = MealTrainMembership
        fields = [
            'id', 'user', 'user_id', 'meal_train', 'meal_train_detail',
            'status', 'requested_at', 'responded_at'
        ]
        read_only_fields = ['requested_at', 'responded_at']

    def validate(self, attrs):
        request = self.context.get('request')
        if request and request.method == 'POST':
            user = attrs.get('user', request.user)
            meal_train = attrs.get('meal_train')
            if MealTrainMembership.objects.filter(user=user, meal_train=meal_train).exists():
                raise serializers.ValidationError(
                    "You have already requested to join this meal train."
                )
        return attrs

    def create(self, validated_data):
        if 'user' not in validated_data:
            validated_data['user'] = self.context['request'].user
        # Default status is PENDING, but allow explicit if needed
        return super().create(validated_data)


# ---------- MealSignup Serializer ----------
class MealSignupSerializer(serializers.ModelSerializer):
    participant = UserSerializer(read_only=True)
    participant_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(),
        source='participant',
        write_only=True,
        required=False
    )
    meal_slot = serializers.PrimaryKeyRelatedField(queryset=MealSlot.objects.all())
    meal_slot_detail = MealSlotSerializer(source='meal_slot', read_only=True)

    class Meta:
        model = MealSignup
        fields = [
            'id', 'meal_slot', 'meal_slot_detail', 'participant', 'participant_id',
            'meal_description', 'special_notes', 'created_at'
        ]
        read_only_fields = ['created_at']

    def validate(self, attrs):
        request = self.context.get('request')
        meal_slot = attrs.get('meal_slot')
        participant = attrs.get('participant', request.user if request else None)

        # Ensure the participant has an approved membership for this meal train
        if meal_slot and participant:
            approved = MealTrainMembership.objects.filter(
                user=participant,
                meal_train=meal_slot.meal_train,
                status=MealTrainMembership.Status.APPROVED
            ).exists()
            if not approved:
                raise serializers.ValidationError(
                    "You must be approved to join this meal train before signing up."
                )

        if request and request.method == 'POST' and meal_slot and participant:
            if MealSignup.objects.filter(meal_slot=meal_slot, participant=participant).exists():
                raise serializers.ValidationError(
                    "You have already signed up for this slot."
                )
        return attrs

    def create(self, validated_data):
        # Automatically set the participant to the current user if not provided
        if 'participant' not in validated_data:
            validated_data['participant'] = self.context['request'].user
        return super().create(validated_data)