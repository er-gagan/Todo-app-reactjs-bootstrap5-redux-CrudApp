from django.urls import path
from .views import *

urlpatterns = [
    path('',ApiRoot.as_view(), name='root'),
    path('todos',ToDoAppViews.as_view(), name="todos"),
    path('person',PersonAppViews.as_view(), name="person"),
]