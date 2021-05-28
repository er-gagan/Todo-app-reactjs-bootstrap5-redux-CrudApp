# from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView
from django.urls import path
from .views import *

urlpatterns = [
    path('', ApiRoot.as_view(), name='root'),
    path('todos', ToDoAppViews.as_view(), name="todos"),
    path('person', PersonAppViews.as_view(), name="person"),
    path('login', LoginViews.as_view(), name="login"),
    # path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
]