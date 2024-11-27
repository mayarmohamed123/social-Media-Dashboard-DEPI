from rest_framework.routers import DefaultRouter
from .views import UserViewSet, IsAuthenticated, ChangePasswordView
from django.urls import path, include

router = DefaultRouter()
router.register('users', UserViewSet, basename='users')

urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', IsAuthenticated.as_view(), name='api-auth'),
    path('change-password/', ChangePasswordView.as_view(), name='change-password'),
]
