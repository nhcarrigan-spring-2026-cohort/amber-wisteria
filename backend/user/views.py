from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi


from .serializers import (
    LoginSerializer,
    MeSerializer,
    RegisterSerializer,
    UserSearchSerializer,
    tokens_for_user,
)

User = get_user_model()

class RegisterView(APIView):
    permission_classes = [AllowAny]
    
    @swagger_auto_schema(request_body=RegisterSerializer)
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        # auto-login: return tokens
        return Response(tokens_for_user(user), status=status.HTTP_201_CREATED)
 

class LoginView(APIView):
    permission_classes = [AllowAny]

    @swagger_auto_schema(request_body=LoginSerializer)
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_401_UNAUTHORIZED)
        user = serializer.validated_data["user"]

        return Response(tokens_for_user(user), status=status.HTTP_200_OK)


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # simple logout: client deletes tokens
        return Response({"detail": "Logged out."}, status=status.HTTP_200_OK)


class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response(MeSerializer(request.user).data, status=status.HTTP_200_OK)


class UserSearchView(APIView):
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        operation_description="Search for users by username (case-insensitive, partial match)",
        manual_parameters=[
            openapi.Parameter(
                'username',
                openapi.IN_QUERY,
                description="Username to search for",
                type=openapi.TYPE_STRING,
                required=True
            )
        ],
        responses={
            200: UserSearchSerializer(many=True),
            400: "Bad Request - username parameter missing"
        }
    )
        
    def get(self, request):
        query = request.query_params.get("username")
        if not query:
            return Response({"detail": "Query parameter 'username' is required."}, status=status.HTTP_400_BAD_REQUEST)

        # search by username (case-insensitive, partial match)
        users = User.objects.filter(username__icontains=query, is_active=True).exclude(id=request.user.id)[:20]  # exclude self from results, limit to 20
        serializer = UserSearchSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)