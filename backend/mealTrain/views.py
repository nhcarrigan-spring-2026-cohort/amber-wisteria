from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from .models import MealTrain, MealSlot, MealTrainMembership, MealSignup
from .serializers import (
    MealTrainCreateSerializer,
    MealTrainSerializer,
    MealSlotSerializer,
    MealTrainMembershipSerializer,
    MealSignupSerializer,
)
from .permissions import is_allowed_participant, is_organizer


# -------------------- MealTrain Views --------------------
class MealTrainListCreateView(APIView):
    """
    GET  /api/mealtrains/          → list all meal trains
    POST /api/mealtrains/          → create a new meal train
    """

    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        operation_description="List all meal trains",
        responses={200: MealTrainSerializer(many=True)},
    )
    def get(self, request):  # TODO: Only get the user's related meal trains
        trains = MealTrain.objects.all()
        serializer = MealTrainSerializer(
            trains, many=True, context={"request": request}
        )
        return Response(serializer.data)

    @swagger_auto_schema(
        operation_description="Create a new meal train",
        request_body=MealTrainCreateSerializer,
        responses={
            201: MealTrainCreateSerializer(),
            400: "Bad Request (validation errors)",
            401: "Unauthorized",
        },
    )
    def post(self, request):
        serializer = MealTrainCreateSerializer(
            data=request.data, context={"request": request}
        )
        if serializer.is_valid():
            serializer.save(organizer=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MealTrainDetailView(APIView):
    """
    GET    /api/mealtrains/{id}/   → retrieve (organizer or participant)
    PUT    /api/mealtrains/{id}/   → full update (organizer only)
    PATCH  /api/mealtrains/{id}/   → partial update (organizer only)
    DELETE /api/mealtrains/{id}/   → delete (organizer only)
    """

    permission_classes = [IsAuthenticated]

    def get_meal_train(self, pk):
        return get_object_or_404(MealTrain, pk=pk)

    @swagger_auto_schema(
        operation_description="Retrieve a specific meal train",
        responses={
            200: MealTrainSerializer(),
            404: "Not found",
            401: "Unauthorized",
            403: "Forbidden",
        },
    )
    def get(self, request, pk):
        train = self.get_meal_train(pk)
        if not is_allowed_participant(request.user, train):
            self.permission_denied(
                self.request,
                "Only approved members can retrieve the meal train details.",
            )
        serializer = MealTrainSerializer(train, context={"request": request})
        return Response(serializer.data)

    @swagger_auto_schema(
        operation_description="Fully update a meal train (organizer only)",
        request_body=MealTrainSerializer,
        responses={
            200: MealTrainSerializer(),
            400: "Bad Request",
            401: "Not authorized",
            403: "Forbidden (not organizer)",
        },
    )
    def put(self, request, pk):
        train = self.get_meal_train(pk)
        if not is_organizer(request.user, train):
            self.permission_denied(
                self.request, "Only organizers can update the meal train."
            )
        serializer = MealTrainSerializer(
            train, data=request.data, context={"request": request}
        )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(
        operation_description="Partially update a meal train (organizer only)",
        request_body=MealTrainSerializer,
        responses={
            200: MealTrainSerializer(),
            400: "Bad Request",
            401: "Unauthorized",
            403: "Forbidden (not organizer)",
        },
    )
    def patch(self, request, pk):
        train = self.get_meal_train(pk)
        if not is_organizer(request.user, train):
            self.permission_denied(
                self.request, "Only organizers can update the meal train."
            )
        serializer = MealTrainSerializer(
            train, data=request.data, partial=True, context={"request": request}
        )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(
        operation_description="Delete a meal train (organizer only)",
        responses={
            204: "No Content",
            401: "Unauthorized",
            403: "Forbidden (not organizer)",
            404: "Not found",
        },
    )
    def delete(self, request, pk):
        train = self.get_meal_train(pk)
        if not is_organizer(request.user, train):
            self.permission_denied(
                self.request, "Only organizers can delete the meal train."
            )
        train.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# -------------------- MealSlot Views (nested under meal train) --------------------
class MealSlotListCreateView(APIView):
    """
    GET  /api/mealtrains/{meal_train_id}/slots/   → list slots of a specific train
    POST /api/mealtrains/{meal_train_id}/slots/   → create a new slot (organizer only)
    """

    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        operation_description="List all slots for a specific meal train",
        responses={
            200: MealSlotSerializer(many=True),
            400: "Bad Request",
            401: "Unauthorized",
            403: "Forbidden (not approved participant)",
            404: "Not found",
        },
    )
    def get(self, request, meal_train_id):
        train = get_object_or_404(MealTrain, pk=meal_train_id)
        if not is_allowed_participant(request.user, train):
            self.permission_denied(
                self.request,
                "Only approved members can retrieve the slots details.",
            )
        slots = MealSlot.objects.filter(meal_train=train)
        serializer = MealSlotSerializer(slots, many=True, context={"request": request})
        return Response(serializer.data)

    @swagger_auto_schema(
        operation_description="Create a new slot for a meal train (organizer only)",
        request_body=MealSlotSerializer,
        responses={
            201: MealSlotSerializer(),
            400: "Bad Request",
            401: "Unauthorized",
            403: "Forbidden (not organizer)",
            404: "Not found",
        },
    )
    def post(self, request, meal_train_id):
        train = get_object_or_404(MealTrain, pk=meal_train_id)
        if not is_organizer(request.user, train):
            return Response(
                {"detail": "Only the organizer can create slots."},
                status=status.HTTP_403_FORBIDDEN,
            )
        serializer = MealSlotSerializer(data=request.data, context={"request": request})
        if serializer.is_valid():
            serializer.save(meal_train=train)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MealSlotDetailView(APIView):
    """
    GET    /api/slots/{id}/        → retrieve a specific slot
    PUT    /api/slots/{id}/        → update (organizer of parent train)
    PATCH  /api/slots/{id}/        → partial update (organizer)
    DELETE /api/slots/{id}/        → delete (organizer)
    """

    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        return get_object_or_404(MealSlot, pk=pk)

    @swagger_auto_schema(
        operation_description="Retrieve a specific slot",
        responses={200: MealSlotSerializer()},
    )
    def get(self, request, pk):
        slot = self.get_object(pk)
        serializer = MealSlotSerializer(slot, context={"request": request})
        return Response(serializer.data)

    @swagger_auto_schema(
        operation_description="Fully update a slot (organizer of the parent meal train only)",
        request_body=MealSlotSerializer,
        responses={
            200: MealSlotSerializer(),
            400: "Bad Request",
            403: "Forbidden (not organizer)",
        },
    )
    def put(self, request, pk):
        slot = self.get_object(pk)
        self.check_organizer(slot, request.user)
        serializer = MealSlotSerializer(
            slot, data=request.data, context={"request": request}
        )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(
        operation_description="Partially update a slot (organizer of the parent meal train only)",
        request_body=MealSlotSerializer,
        responses={
            200: MealSlotSerializer(),
            400: "Bad Request",
            403: "Forbidden (not organizer)",
        },
    )
    def patch(self, request, pk):
        slot = self.get_object(pk)
        self.check_organizer(slot, request.user)
        serializer = MealSlotSerializer(
            slot, data=request.data, partial=True, context={"request": request}
        )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(
        operation_description="Delete a slot (organizer of the parent meal train only)",
        responses={204: "No Content", 403: "Forbidden (not organizer)"},
    )
    def delete(self, request, pk):
        slot = self.get_object(pk)
        self.check_organizer(slot, request.user)
        slot.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def check_organizer(self, slot, user):
        if slot.meal_train.organizer != user:
            self.permission_denied(
                self.request, "Only the organizer can modify this slot."
            )


# -------------------- MealTrainMembership Views (nested under meal train) --------------------
class MealTrainMembershipListCreateView(APIView):
    """
    GET  /api/mealtrains/{meal_train_id}/memberships/    → list memberships
         - organizer sees all, regular users see only their own
    POST /api/mealtrains/{meal_train_id}/memberships/    → request to join (creates pending)
    """

    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        operation_description="List memberships of a meal train (organizer sees all, users see only their own)",
        responses={200: MealTrainMembershipSerializer(many=True)},
    )
    def get(self, request, meal_train_id):
        train = get_object_or_404(MealTrain, pk=meal_train_id)
        if train.organizer == request.user:
            memberships = MealTrainMembership.objects.filter(meal_train=train)
        else:
            memberships = MealTrainMembership.objects.filter(
                meal_train=train, user=request.user
            )
        serializer = MealTrainMembershipSerializer(
            memberships, many=True, context={"request": request}
        )
        return Response(serializer.data)

    @swagger_auto_schema(
        operation_description="Request to join a meal train (creates pending membership)",
        responses={
            201: MealTrainMembershipSerializer(),
            400: "Bad Request (duplicate request or validation error)",
            401: "Unauthorized",
        },
    )
    def post(self, request, meal_train_id):
        train = get_object_or_404(MealTrain, pk=meal_train_id)
        serializer = MealTrainMembershipSerializer(
            data={"user": request.user.id, "meal_train": meal_train_id},
            context={"request": request},
        )
        if serializer.is_valid():
            serializer.save(
                user=request.user,
                meal_train=train,
                status=MealTrainMembership.Status.PENDING,
            )
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MealTrainMembershipDetailView(APIView):
    """
    GET    /api/memberships/{id}/     → retrieve a specific membership (only organizers)
    DELETE /api/memberships/{id}/     → delete/cancel request (only organizers)
    """

    permission_classes = [IsAuthenticated]

    def get_object(self, pk, user):
        membership = get_object_or_404(MealTrainMembership, pk=pk)
        # Only allow if user owns the membership or is the organizer of the train
        if membership.user != user and membership.meal_train.organizer != user:
            self.permission_denied(
                None, "You do not have permission to access this membership."
            )
        return membership

    @swagger_auto_schema(
        operation_description="Retrieve a specific membership (owner or organizer only)",
        responses={200: MealTrainMembershipSerializer()},
    )
    def get(self, request, pk):
        membership = self.get_object(pk, request.user)
        serializer = MealTrainMembershipSerializer(
            membership, context={"request": request}
        )
        return Response(serializer.data)

    @swagger_auto_schema(
        operation_description="Delete/cancel a membership request (owner or organizer only)",
        responses={204: "No Content", 403: "Forbidden"},
    )
    def delete(self, request, pk):
        membership = self.get_object(pk, request.user)
        membership.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class MealTrainMembershipApproveRejectView(APIView):
    """
    POST /api/memberships/{id}/approve/   → approve a pending request (organizer only)
    POST /api/memberships/{id}/reject/    → reject a pending request (organizer only)
    """

    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        operation_description="Approve or reject a pending membership request (organizer only)",
        manual_parameters=[
            openapi.Parameter(
                "action",
                openapi.IN_PATH,
                description="Action to perform: 'approve' or 'reject'",
                type=openapi.TYPE_STRING,
                enum=["approve", "reject"],
            )
        ],
        responses={
            200: MealTrainMembershipSerializer(),
            400: "Bad Request (membership not pending or invalid action)",
            403: "Forbidden (not organizer)",
        },
    )
    def post(self, request, pk, action):
        membership = get_object_or_404(MealTrainMembership, pk=pk)
        if membership.meal_train.organizer != request.user:
            return Response(
                {"detail": "Only the organizer can perform this action."},
                status=status.HTTP_403_FORBIDDEN,
            )
        if membership.status != MealTrainMembership.Status.PENDING:
            return Response(
                {"detail": "This membership is not pending."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if action == "approve":
            membership.status = MealTrainMembership.Status.APPROVED
        elif action == "reject":
            membership.status = MealTrainMembership.Status.REJECTED
        else:
            return Response(
                {"detail": "Invalid action."}, status=status.HTTP_400_BAD_REQUEST
            )

        membership.save(update_fields=["status", "responded_at"])
        serializer = MealTrainMembershipSerializer(
            membership, context={"request": request}
        )
        return Response(serializer.data, status=status.HTTP_200_OK)


# -------------------- MealSignup Views (nested under meal slot) --------------------
class MealSignupListCreateView(APIView):
    """
    POST /api/slots/{slot_id}/signups/      → sign up for this slot (must be approved member)
    """

    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        operation_description="Sign up for a slot",
        request_body=MealSignupSerializer,
        responses={
            201: MealSignupSerializer(),
            400: "Bad Request (duplicate signup or validation error)",
        },
    )
    def post(self, request, slot_id):
        slot = get_object_or_404(MealSlot, pk=slot_id)
        user = request.user

        # Prevent duplicate
        if MealSignup.objects.filter(meal_slot=slot, participant=user).exists():
            return Response(
                {"detail": "You have already signed up for this slot."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        serializer = MealSignupSerializer(
            data=request.data, context={"request": request}
        )
        if serializer.is_valid():
            serializer.save(participant=user, meal_slot=slot)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MealSignupDetailView(APIView):
    """
    GET    /api/signups/{id}/       → retrieve a specific signup (participant or organizer)
    PUT    /api/signups/{id}/       → update (only participant)
    PATCH  /api/signups/{id}/       → partial update (only participant)
    DELETE /api/signups/{id}/       → delete/cancel (only participant)
    """

    permission_classes = [IsAuthenticated]

    def get_object(self, pk, user):
        signup = get_object_or_404(MealSignup, pk=pk)
        # Allow if participant or organizer of the train
        if not is_allowed_participant(user, signup.meal_slot.meal_train):
            self.permission_denied(
                None, "You do not have permission to access this meal."
            )
        return signup

    @swagger_auto_schema(
        operation_description="Retrieve a specific signup (participant or organizer only)",
        responses={200: MealSignupSerializer()},
    )
    def get(self, request, pk):
        signup = self.get_object(pk, request.user)
        serializer = MealSignupSerializer(signup, context={"request": request})
        return Response(serializer.data)

    @swagger_auto_schema(
        operation_description="Fully update a signup (meal owner only)",
        request_body=MealSignupSerializer,
        responses={
            200: MealSignupSerializer(),
            400: "Bad Request",
            403: "Forbidden (not owner)",
        },
    )
    def put(self, request, pk):
        signup = self.get_object(pk, request.user)
        if signup.participant != request.user:
            return Response(
                {"detail": "Only the owner can update this meal."},
                status=status.HTTP_403_FORBIDDEN,
            )
        serializer = MealSignupSerializer(
            signup, data=request.data, context={"request": request}
        )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(
        operation_description="Partially update a signup (meal owner only)",
        request_body=MealSignupSerializer,
        responses={
            200: MealSignupSerializer(),
            400: "Bad Request",
            403: "Forbidden (not owner)",
        },
    )
    def patch(self, request, pk):
        signup = self.get_object(pk, request.user)
        if signup.participant != request.user:
            return Response(
                {"detail": "Only the owner can update this meal."},
                status=status.HTTP_403_FORBIDDEN,
            )
        serializer = MealSignupSerializer(
            signup, data=request.data, partial=True, context={"request": request}
        )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(
        operation_description="Delete/cancel a signup (participant only)",
        responses={204: "No Content", 403: "Forbidden (not participant)"},
    )
    def delete(self, request, pk):
        signup = self.get_object(pk, request.user)
        if signup.participant != request.user and signup.participant != signup.meal_slot.meal_train.organizer:
            return Response(
                {"detail": "Only the owner and the train's organizer can delete this meal."},
                status=status.HTTP_403_FORBIDDEN,
            )
        signup.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
