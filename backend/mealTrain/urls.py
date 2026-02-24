from django.urls import path
from . import views

urlpatterns = [
    # MealTrain
    path('mealtrains/', views.MealTrainListCreateView.as_view(), name='mealtrain-list'),
    path('mealtrains/<int:pk>/', views.MealTrainDetailView.as_view(), name='mealtrain-detail'),

    # MealSlot (nested)
    path('mealtrains/<int:meal_train_id>/slots/', views.MealSlotListCreateView.as_view(), name='slot-list'),
    path('slots/<int:pk>/', views.MealSlotDetailView.as_view(), name='slot-detail'),

    # MealTrainMembership (nested)
    path('mealtrains/<int:meal_train_id>/memberships/', views.MealTrainMembershipListCreateView.as_view(), name='membership-list'),
    path('memberships/<int:pk>/', views.MealTrainMembershipDetailView.as_view(), name='membership-detail'),
    path('memberships/<int:pk>/approve/', views.MealTrainMembershipApproveRejectView.as_view(), {'action': 'approve'}, name='membership-approve'),
    path('memberships/<int:pk>/reject/', views.MealTrainMembershipApproveRejectView.as_view(), {'action': 'reject'}, name='membership-reject'),

    # MealSignup (nested)
    path('slots/<int:slot_id>/signups/', views.MealSignupListCreateView.as_view(), name='signup-list'),
    path('signups/<int:pk>/', views.MealSignupDetailView.as_view(), name='signup-detail'),
]