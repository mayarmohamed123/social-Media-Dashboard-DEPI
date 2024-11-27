from .serializers import UserSerializer, ChangePasswordSerializer
from .models import User
from rest_framework.viewsets import ModelViewSet
from rest_framework import permissions, status
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response
from datetime import timedelta

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(hours=1),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=1),
    'BLACKLIST_AFTER_ROTATION': True,

    # custom
    "AUTH_COOKIE": "access_token",
    "AUTH_COOKIE_DOMAIN": None,
    "AUTH_COOKIE_SECURE": True,

    # restricts the transmission of the cookie to only occur over secure (HTTPS) connections.
    "AUTH_COOKIE_HTTP_ONLY": True,
    "AUTH_COOKIE_PATH": "/",  # URL path where cookie will be sent
    "AUTH_COOKIE_SAMESITE": "None",  # specifies whether the cookie should be sent in cross site requests
}


class UserTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        access_token = response.data['access']
        response.set_cookie(
            key=SIMPLE_JWT['AUTH_COOKIE'],
            value=access_token,
            httponly=SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
            secure=SIMPLE_JWT['AUTH_COOKIE_SECURE'],
            domain=SIMPLE_JWT['AUTH_COOKIE_DOMAIN'],
            path=SIMPLE_JWT['AUTH_COOKIE_PATH'],
            samesite=SIMPLE_JWT['AUTH_COOKIE_SAMESITE'],
            expires=True,
            max_age=SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'],
        )
        return response


class LogoutView(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = []

    def post(self, request):
        response = Response({"message": "user logout"})
        response.delete_cookie(
            key=SIMPLE_JWT['AUTH_COOKIE'],
            path=SIMPLE_JWT['AUTH_COOKIE_PATH'],
            domain=SIMPLE_JWT['AUTH_COOKIE_DOMAIN'],
            samesite=SIMPLE_JWT['AUTH_COOKIE_SAMESITE'],
        )

        return response


class IsAuthenticated(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        is_authenticated = request.user.is_authenticated
        if is_authenticated:
            user_serialized = UserSerializer(request.user, context={"request": request}).data
            return Response(user_serialized, status=status.HTTP_200_OK)


class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_permissions(self):
        if self.action == 'create':
            permission_classes = [permissions.AllowAny]
        else:
            permission_classes = [permissions.IsAuthenticated]
        return [permission() for permission in permission_classes]


class ChangePasswordView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = request.user
        serializer = ChangePasswordSerializer(data=request.data, context={'request': request})

        if serializer.is_valid():
            user.set_password(serializer.validated_data['new_password'])
            user.save()
            return Response({"message": "Password updated successfully"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
