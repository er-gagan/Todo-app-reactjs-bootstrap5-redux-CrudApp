from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView
from django.urls import path
from .views import *

urlpatterns = [
    path('', ApiRoot.as_view(), name='root'),
    path('todos', ToDoAppViews.as_view(), name="todos"),
    
    path('register', UserView.as_view(), name="register"),
    path('verify/<auth_token>', VerifyAccount, name="VerifyAccount"),

    path('login', TokenObtainPairView.as_view(), name='login'),

    path('change_password', changePasswordView.as_view(), name='change_password'),
    
    path('forgot_password_email_verification', forgot_password_email_verification_View.as_view(), name='forgot_password_email_verification'),
    
    path('forgot_password_otp_verification', forgot_password_otp_verification_View.as_view(), name='forgot_password_otp_verification'),

    path('forgot_password_with_new_password', forgot_password_with_new_password_View.as_view(), name='forgot_password_with_new_password'),
    # path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
]