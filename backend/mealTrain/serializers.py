from rest_framework import serializers
from .models import MealTrain, MealSlot, MealTrainMembership, MealSignup


# ---------- MealSlot Serializer (used for nested representation) ----------
class MealSlotSerializer(serializers.ModelSerializer):
    class Meta:
        model = MealSlot
        fields = ["id", "slot_date", "meal_type"]
        # Note: 'meal_train' is omitted because it will be set from the parent


# ---------- MealSignup Serializer ----------
class MealSignupSerializer(serializers.ModelSerializer):

    prepared_by = serializers.SerializerMethodField()

    class Meta:
        model = MealSignup
        fields = ["id", "meal_slot", "meal_description", "special_notes", "prepared_by", "created_at"]
        read_only_fields = ["prepared_by", "created_at"]

    def get_prepared_by(self, obj):
        participant = obj.participant.username
        return participant

# ---------- MealTrain Serializers ----------
class MealTrainCreateSerializer(serializers.ModelSerializer):

    slots = MealSlotSerializer(
        many=True, required=True, help_text="List of slots to create within the train"
    )
    meals = serializers.SerializerMethodField()
    class Meta:
        model = MealTrain
        fields = [
            "id",
            "title",
            "description",
            "organizer_id",
            "beneficiary_name",
            "beneficiary_address",
            "beneficiary_phone",
            "beneficiary_email",
            "dietary_restrictions",
            "created_at",
            "slots",
            "meals",
        ]
        read_only_fields = ["created_at"]

    def create(self, validated_data):
        # Extract slots data:
        slots_data = validated_data.pop("slots", [])
        # create the train:
        train = MealTrain.objects.create(**validated_data)
        # Create each slot:
        for slot_data in slots_data:
            MealSlot.objects.create(meal_train=train, **slot_data)
        return train

    def update(self, instance, validated_data):
        # Update train fields:
        for attr, value in validated_data.items():
            if attr != "slots":
                setattr(instance, attr, value)
        instance.save()

        # Handle slots update:
        slots_data = validated_data.get("slots")
        if slots_data is not None:
            existing_slots = instance.slots.all()
            formatted_existing_slots = [{"slot_date":slot.slot_date, "meal_type": slot.meal_type} for slot in existing_slots]
            filtered_new_slots = []
            for slot_data in slots_data:
                if slot_data not in formatted_existing_slots:
                    filtered_new_slots.append(slot_data)

            if filtered_new_slots:                
                MealSlot.objects.bulk_create([MealSlot(meal_train=instance, **slot_data) for slot_data in filtered_new_slots])

        return instance
    
    def get_meals(self, obj):
        signups = MealSignup.objects.filter(meal_slot__meal_train=obj)
        return MealSignupSerializer(signups, many=True, context=self.context).data


class MealTrainSerializer(serializers.ModelSerializer):

    slots = MealSlotSerializer(
        many=True, read_only=True, help_text="List of slots within the train"
    )
    meals = serializers.SerializerMethodField()

    membership_status = serializers.SerializerMethodField()

    class Meta:
        model = MealTrain
        fields = [
            "id",
            "title",
            "description",
            "organizer_id",
            "beneficiary_name",
            "beneficiary_address",
            "beneficiary_phone",
            "beneficiary_email",
            "dietary_restrictions",
            "created_at",
            "slots",
            "meals",
            "membership_status",
        ]
        read_only_fields = ["created_at", "membership_status"]

    def get_meals(self, obj):
        signups = MealSignup.objects.filter(meal_slot__meal_train=obj)
        return MealSignupSerializer(signups, many=True, context=self.context).data
    
    def get_membership_status(self, obj):
        request = self.context.get("request")
        if not request or not request.user.is_authenticated:
            return None
        
        user = request.user
        if obj.organizer == user:
            return "owner"
        
        membership = self.context.get("memberships", {}).get(meal_train=obj)
        return membership.status if membership else None
            

# ---------- MealTrainMembership Serializer ----------
class MealTrainMembershipSerializer(serializers.ModelSerializer):

    username = serializers.CharField(source="user.username", read_only=True)

    class Meta:
        model = MealTrainMembership
        fields = [
            "id",
            "user_id",
            "username",
            "meal_train",
            "status",
            "requested_at",
            "responded_at",
        ]
        read_only_fields = ["requested_at", "responded_at"]

    def validate(self, attrs):
        request = self.context.get("request")
        if request and request.method == "POST":
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
        if "user" not in validated_data:
            validated_data["user"] = self.context["request"].user
        # Default status is PENDING, but allow explicit if needed
        return super().create(validated_data)
