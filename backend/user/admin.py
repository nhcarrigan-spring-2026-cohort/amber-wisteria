from django.contrib import admin

from .models import MealTrain, MealTrainParticipant, Profile

admin.site.register(Profile)
admin.site.register(MealTrain)
admin.site.register(MealTrainParticipant)
