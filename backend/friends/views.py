from django.shortcuts import render
from django.contrib.auth import get_user_model
from django.db.models import Q
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from drf_yasg.utils import swagger_auto_schema

from .models import FriendRequest
from .serializers import (
    FriendRequestCreateSerializer,
    FriendRequestRespondSerializer,
    FriendRequestSerializer,
    FriendSerializer,
)

User = get_user_model()

# Create your views here.

class SendFriendRequestView(APIView):
    """Send a friend request to another user"""
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        operation_description="Send a friend request to another user",
        request_body=FriendRequestCreateSerializer,
        responses={
            201: FriendRequestSerializer,
            400: "Bad Request - validation errors"
        }
    )
    def post(self, request):
        serializer = FriendRequestCreateSerializer(data=request.data, context={"request": request})
        serializer.is_valid(raise_exception=True)
        friend_request = serializer.save()
        
        # Check if auto-accepted
        if serializer.validated_data.get("auto_accepted"):
            return Response(
                {
                    "detail": "Friend request auto-accepted (mutual request detected).",
                    "friend_request": FriendRequestSerializer(friend_request).data
                },
                status=status.HTTP_201_CREATED
            )
        
        return Response(FriendRequestSerializer(friend_request).data, status=status.HTTP_201_CREATED)


class RespondFriendRequestView(APIView):
    """Accept or reject a friend request"""
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        operation_description="Accept or reject a friend request",
        request_body=FriendRequestRespondSerializer,
        responses={
            200: "Friend request accepted/rejected successfully",
            400: "Bad Request - validation errors",
            404: "Friend request not found"
        }
    )
    def post(self, request, request_id):
        # Get the friend request
        try:
            friend_request = FriendRequest.objects.select_related('sender', 'receiver').get(
                id=request_id, 
                receiver=request.user, 
                status=FriendRequest.STATUS_PENDING
            )
        except FriendRequest.DoesNotExist:
            return Response({"detail": "Friend request not found or already responded to."}, status=status.HTTP_404_NOT_FOUND)

        # Validate action
        serializer = FriendRequestRespondSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        action = serializer.validated_data["action"]

        if action == "accept":
            friend_request.status = FriendRequest.STATUS_ACCEPTED
            friend_request.save()
            return Response({"detail": "Friend request accepted.", "friend_request": FriendRequestSerializer(friend_request).data}, status=status.HTTP_200_OK)
        else:  # reject
            friend_request.delete()
            return Response({"detail": "Friend request rejected."}, status=status.HTTP_200_OK)


class IncomingFriendRequestsView(APIView):
    """Get all incoming pending friend requests"""
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        operation_description="Get all incoming pending friend requests",
        responses={200: FriendRequestSerializer(many=True)}
    )
    def get(self, request):
        friend_requests = FriendRequest.objects.filter(
            receiver=request.user, 
            status=FriendRequest.STATUS_PENDING
        ).select_related('sender', 'receiver')
        serializer = FriendRequestSerializer(friend_requests, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class OutgoingFriendRequestsView(APIView):
    """Get all outgoing pending friend requests"""
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        operation_description="Get all outgoing pending friend requests",
        responses={200: FriendRequestSerializer(many=True)}
    )
    def get(self, request):
        friend_requests = FriendRequest.objects.filter(
            sender=request.user, 
            status=FriendRequest.STATUS_PENDING
        ).select_related('sender', 'receiver')
        serializer = FriendRequestSerializer(friend_requests, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class FriendsListView(APIView):
    """Get all accepted friends"""
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        operation_description="Get all accepted friends",
        responses={200: FriendSerializer(many=True)}
    )
    def get(self, request):
        # Get all accepted friend requests where user is either sender or receiver
        friend_requests = FriendRequest.objects.filter(
            Q(sender=request.user) | Q(receiver=request.user),
            status=FriendRequest.STATUS_ACCEPTED
        ).select_related('sender', 'receiver')
        
        # Extract the friend users
        friends = []
        for fr in friend_requests:
            friend = fr.receiver if fr.sender == request.user else fr.sender
            friends.append({"id": friend.id, "username": friend.username})
        
        serializer = FriendSerializer(friends, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class UnfriendView(APIView):
    """Remove a friend (delete the friendship)"""
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        operation_description="Remove a friend by user ID",
        responses={
            200: "Friendship removed successfully",
            404: "Friendship not found"
        }
    )
    def delete(self, request, user_id):
        # Find the accepted friend request between current user and target user
        friend_request = FriendRequest.objects.filter(
            Q(sender=request.user, receiver_id=user_id) | Q(sender_id=user_id, receiver=request.user),
            status=FriendRequest.STATUS_ACCEPTED
        ).first()

        if not friend_request:
            return Response({"detail": "Friendship not found."}, status=status.HTTP_404_NOT_FOUND)

        friend_request.delete()
        return Response({"detail": "Friendship removed successfully."}, status=status.HTTP_200_OK)
