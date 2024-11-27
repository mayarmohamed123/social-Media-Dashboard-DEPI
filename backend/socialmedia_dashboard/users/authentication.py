from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.authentication import CSRFCheck
from rest_framework.exceptions import PermissionDenied


def enforce_csrf(request):
    check = CSRFCheck(get_response=lambda req: None)
    check.process_request(request)
    reason = check.process_view(request, None, (), {})
    if reason:
        raise PermissionDenied('CSRF Failed: %s' % reason)


class UserAuthentication(JWTAuthentication):
    def authenticate(self, request):
        header = self.get_header(request)
        if header is None:
            raw_token = request.COOKIES.get('access_token')
        else:
            raw_token = self.get_raw_token(header)

        if raw_token is None:
            return None

        validated_token = self.get_validated_token(raw_token)

        # if "access_token" in request.COOKIES:
        #     enforce_csrf(request)

        return self.get_user(validated_token), raw_token
