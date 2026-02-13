from django.urls import path

from .views import RegisterView, LoginView, LogoutView, MeView, UserSearchView

urlpatterns = [
    path("auth/register", RegisterView.as_view()),
    path("auth/login", LoginView.as_view()),
    path("auth/logout", LogoutView.as_view()),
    path("me", MeView.as_view()),
    path("users/search", UserSearchView.as_view()),
]
