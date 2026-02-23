from django.shortcuts import get_object_or_404
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

# ---------- MealSlot Serializer (used for nested representation) ----------
class MealSlotSerializer(serializers.ModelSerializer):
    class Meta:
        model = MealSlot
        fields = ['id', 'slot_date', 'meal_type']
        # Note: 'meal_train' is omitted because it will be set from the parent

# ---------- MealTrain Serializers ----------
class MealTrainCreateSerializer(serializers.ModelSerializer):

    slots = MealSlotSerializer(many=True, required=True, help_text="List of slots to create within the train")

    class Meta:
        model = MealTrain
        fields = [
            'id', 'title', 'description', 'organizer_id',
            'beneficiary_name', 'beneficiary_address', 'beneficiary_phone',
            'beneficiary_email', 'dietary_restrictions', 'created_at', 'slots'
        ]
        read_only_fields = ['created_at']
    
    def create(self, validated_data):
        # Extract slots data:
        slots_data = validated_data.pop('slots', [])
        # create the train:
        train = MealTrain.objects.create(**validated_data)        
        # Create each slot:
        for slot_data in slots_data:
            MealSlot.objects.create(meal_train=train, **slot_data)
        return train

class MealTrainSerializer(serializers.ModelSerializer):

    slots = MealSlotSerializer(many=True, read_only=True, help_text="List of slots within the train")

    class Meta:
        model = MealTrain
        fields = [
            'id', 'title', 'description', 'organizer_id',
            'beneficiary_name', 'beneficiary_address', 'beneficiary_phone',
            'beneficiary_email', 'dietary_restrictions', 'created_at', 'slots'
        ]
        read_only_fields = ['created_at']

    
# ---------- MealTrainMembership Serializer ----------
class MealTrainMembershipSerializer(serializers.ModelSerializer):

    class Meta:
        model = MealTrainMembership
        fields = [
            'id', 'user_id', 'meal_train',
            'status', 'requested_at', 'responded_at'
        ]
        read_only_fields = ['requested_at', 'responded_at']

    def validate(self, attrs):
        request = self.context.get('request')
        if request and request.method == 'POST':
            user = request.user
            train = attrs.get("meal_train")
            if train.organizer == user:
                raise serializers.ValidationError(
                    "You don't need to join your own meal train."
                )
            if MealTrainMembership.objects.filter(user=user, meal_train=train).exists():
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