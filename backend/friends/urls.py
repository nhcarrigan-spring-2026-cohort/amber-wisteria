from django.urls import path

from .views import (
    SendFriendRequestView,
    RespondFriendRequestView,
    IncomingFriendRequestsView,
    OutgoingFriendRequestsView,
    FriendsListView,
    UnfriendView,
)

urlpatterns = [
    path("friends/request", SendFriendRequestView.as_view()),
    path("friends/requests/<int:request_id>/respond", RespondFriendRequestView.as_view()),
    path("friends/requests/incoming", IncomingFriendRequestsView.as_view()),
    path("friends/requests/outgoing", OutgoingFriendRequestsView.as_view()),
    path("friends", FriendsListView.as_view()),
    path("friends/<int:user_id>", UnfriendView.as_view()),
]