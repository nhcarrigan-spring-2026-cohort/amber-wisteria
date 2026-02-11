from rest_framework import serializers

from .models import MealTrain


class MealTrainSerializer(serializers.ModelSerializer):
    class Meta:
        model = MealTrain
        fields = (
            "id",
            "title",
            "description",
            "start_date",
            "end_date",
            "restrictions",
            "creator",
            "created_at",
            "updated_at",       
        )
        read_only_fields = ("id", "creator", "created_at", "updated_at")

    def validate(self, attrs):
        start = attrs.get("start_date")
        end = attrs.get("end_date")
        if start and end and start > end:
            raise serializers.ValidationError("Start date must be before end date.")
        return attrs

