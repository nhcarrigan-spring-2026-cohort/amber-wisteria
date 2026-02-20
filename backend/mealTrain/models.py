from django.conf import settings
from django.db import models

class MealTrain(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    start_date = models.DateField() # from when the meal train starts, not from when the meal train is created, 
    #  this allows users to create meal trains in advance and specify when they will start 
    
    end_date = models.DateField() 
    restrictions = models.JSONField(default=list, blank=True) 
    creator = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="created_meal_trains" )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    def __str__(self) -> str:
        return f"MealTrain({self.title})"   


class MealTrainParticipant(models.Model):
    meal_train = models.ForeignKey(MealTrain, on_delete=models.CASCADE, related_name="participants")
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="meal_trains")
    joined_at = models.DateTimeField(auto_now_add=True)

    class Meta: # a user can only join a meal train once, so we need to enforce this constraint at the database level
        unique_together = ('meal_train', 'user')

    def __str__(self) -> str:
        return f"MealTrainParticipant({self.user.username} in {self.meal_train.title})"