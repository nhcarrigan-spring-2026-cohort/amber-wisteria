from django.conf import settings
from django.db import models


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

    
