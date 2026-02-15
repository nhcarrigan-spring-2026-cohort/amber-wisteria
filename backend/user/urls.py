from django.urls import path

from .views import (
    RegisterView,
    LoginView,
    LogoutView,
    MeView,
    UserSearchView,
    SendFriendRequestView,
    RespondFriendRequestView,
    IncomingFriendRequestsView,
    OutgoingFriendRequestsView,
    FriendsListView,
    UnfriendView,
)

urlpatterns = [
    path("auth/register", RegisterView.as_view()),
    path("auth/login", LoginView.as_view()),
    path("auth/logout", LogoutView.as_view()),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path("me", MeView.as_view()),
    path("users/search", UserSearchView.as_view()),
    
    # Friend request endpoints
    path("friends/request", SendFriendRequestView.as_view()),
    path("friends/requests/<int:request_id>/respond", RespondFriendRequestView.as_view()),
    path("friends/requests/incoming", IncomingFriendRequestsView.as_view()),
    path("friends/requests/outgoing", OutgoingFriendRequestsView.as_view()),
    path("friends", FriendsListView.as_view()),
    path("friends/<int:user_id>", UnfriendView.as_view()),
]
