from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import RegisterView, LoginView, LogoutView, MeView, MealTrainViewSet

router = DefaultRouter()
router.register("meal-trains", MealTrainViewSet, basename="meal-train")

urlpatterns = [
    path("auth/register", RegisterView.as_view()),
    path("auth/login", LoginView.as_view()),
    path("auth/logout", LogoutView.as_view()),
    path("me", MeView.as_view()),
]
#add the automatically generated URLs for the MealTrainViewSet to our urlpatterns "meal-trains" + get, post, put, patch, delete etc. 
urlpatterns += router.urls
