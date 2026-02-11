from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.exceptions import PermissionDenied

from .models import MealTrain
from .serializers import MealTrainSerializer


class MealTrainViewSet(viewsets.ModelViewSet): #drf class-based view that provides default implementations for CRUD operations, automatically maps to URLs 
    queryset = MealTrain.objects.all()
    serializer_class = MealTrainSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(creator=self.request.user) # when a meal train is created, we automatically set the creator to the current user

    def perform_update(self, serializer):
        if serializer.instance.creator != self.request.user:
            raise PermissionDenied("Only the creator can update this meal train.")
        serializer.save()

    def perform_destroy(self, instance):
        if instance.creator != self.request.user:
            raise PermissionDenied("Only the creator can delete this meal train.")
        instance.delete()



