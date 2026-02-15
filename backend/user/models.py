from django.conf import settings
from django.db import models

class Profile(models.Model):
    #settings.AUTH_USER_MODEL refers to the User model defined in settings.AUTH_USER_MODEL
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="profile")
    display_name = models.CharField(max_length=150, blank=True)
    bio = models.TextField(blank=True)
    allergies = models.TextField(blank=True)  # For now we will not use this field, but it can be used in the future to store user allergies, 
    # for now each user will specify their mealTrain their allergies and will be stored in the MealTrain model

    def __str__(self) -> str:
        return f"Profile({self.user.username})"

class FriendRequest(models.Model):
    sender = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="sent_friend_requests")
    receiver = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="received_friend_requests")
    STATUS_PENDING = "pending"
    STATUS_ACCEPTED = "accepted"
    STATUS_CHOICES = [
        (STATUS_PENDING, "Pending"),
        (STATUS_ACCEPTED, "Accepted"),
    ]

    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default=STATUS_PENDING)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)    

    class Meta:
        constraints = [
            models.CheckConstraint(condition=~models.Q(sender=models.F("receiver")), name="friend_request_no_self"), # ensures that a user cannot send a friend request to themselves
            models.UniqueConstraint(fields=["sender", "receiver"], name="unique_friend_request"), # ensures that a user cannot send multiple friend requests to the same user
        ]

    def __str__(self) -> str:
        return f"FriendRequest({self.sender_id} -> {self.receiver_id}, {self.status})"

    
