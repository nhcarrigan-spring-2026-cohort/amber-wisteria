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

