from django.db import models
from django.core.exceptions import ValidationError
from django.conf import settings


class MealTrain(models.Model):
    """Represents a meal train organized for a beneficiary."""

    id = models.BigAutoField(primary_key=True)
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    organizer = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='organized_meal_trains'
    )
    beneficiary_name = models.CharField(max_length=255)
    beneficiary_address = models.CharField(max_length=500, blank=True, null=True)
    beneficiary_phone = models.CharField(max_length=50, blank=True, null=True)
    beneficiary_email = models.EmailField(blank=True, null=True)
    dietary_restrictions = models.TextField(
        blank=True,
        null=True,
        help_text="General dietary notes for the beneficiary"
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title


class MealSlot(models.Model):
    """A specific date and meal type within a meal train."""
    class MealType(models.TextChoices):
        BREAKFAST = 'breakfast', 'Breakfast'
        LUNCH = 'lunch', 'Lunch'
        DINNER = 'dinner', 'Dinner'

    id = models.BigAutoField(primary_key=True)
    meal_train = models.ForeignKey(
        MealTrain,
        on_delete=models.CASCADE,
        related_name='slots'
    )
    slot_date = models.DateField()
    meal_type = models.CharField(max_length=20, choices=MealType.choices)

    class Meta:
        unique_together = ['meal_train', 'slot_date', 'meal_type']
        ordering = ['slot_date', 'meal_type']

    def __str__(self):
        return f"{self.meal_train.title} - {self.slot_date} {self.meal_type}"


class MealTrainMembership(models.Model):
    """Tracks a user's request to join a meal train and its approval status."""
    class Status(models.TextChoices):
        PENDING = 'pending', 'Pending'
        APPROVED = 'approved', 'Approved'
        REJECTED = 'rejected', 'Rejected'

    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='meal_train_memberships'
    )
    meal_train = models.ForeignKey(
        MealTrain,
        on_delete=models.CASCADE,
        related_name='memberships'
    )
    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.PENDING
    )
    requested_at = models.DateTimeField(auto_now_add=True)
    responded_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        unique_together = ['user', 'meal_train']
        ordering = ['-requested_at']

    def __str__(self):
        return f"{self.user.get_full_name()} - {self.meal_train.title} ({self.status})"


class MealSignup(models.Model):
    """A user signing up for a specific meal slot."""

    id = models.BigAutoField(primary_key=True)
    meal_slot = models.ForeignKey(
        MealSlot,
        on_delete=models.CASCADE,
        related_name='signups'
    )
    participant = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='meal_signups'
    )
    meal_description = models.CharField(
        max_length=500,
        blank=True,
        null=True,
        help_text="What the participant plans to bring/serve"
    )
    special_notes = models.TextField(
        blank=True,
        null=True,
        help_text="Any special notes for this signup"
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['meal_slot', 'participant'],
                name='unique_meal_slot_participant'
            )
        ]
        ordering = ['created_at']

    def __str__(self):
        return f"{self.participant.get_full_name()} - {self.meal_slot}"