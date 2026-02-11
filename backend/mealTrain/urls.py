from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import MealTrainViewSet

router = DefaultRouter()
router.register("meal-trains", MealTrainViewSet, basename="meal-train")

urlpatterns = []
urlpatterns += router.urls