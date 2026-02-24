from .models import MealTrainMembership

def is_organizer(user, train):
    return user == train.organizer


def is_allowed_participant(user, train):
    if is_organizer(user, train):
        return True
    membership = MealTrainMembership.objects.filter(user=user, meal_train=train).first()
    if membership and membership.status == "approved":
        return True
    return False
    