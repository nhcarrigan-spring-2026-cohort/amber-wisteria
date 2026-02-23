from rest_framework.permissions import BasePermission, SAFE_METHODS

class IsOrganizerOrReadOnly(BasePermission):
    """
    Object-level permission: allow write only if user is the organizer of the MealTrain.
    Assumes the view has a `get_object()` method or we are checking a model instance.
    """
    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed for any authenticated request
        if request.method in SAFE_METHODS:
            return True
        # Write permissions only for the organizer
        return obj.organizer == request.user

class IsOrganizer(BasePermission):
    """Allows access only to the organizer of the MealTrain."""
    def has_object_permission(self, request, view, obj):
        return obj.organizer == request.user

class IsParticipantOrReadOnly(BasePermission):
    """Allows update/delete only to the participant of a MealSignup."""
    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        return obj.participant == request.user