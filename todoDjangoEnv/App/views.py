from datetime import date
from rest_framework import response
from .models import *
from django.db.models import Q
from rest_framework import status
from rest_framework.views import APIView
from .serializers import *
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.backends import TokenBackend
# from rest_framework_simplejwt.tokens import RefreshToken  # generate jwt manually


def get_user_info(request):
    token = request.META.get('HTTP_AUTHORIZATION', " ").split(' ')[1]
    valid_data = TokenBackend(
        algorithm='HS256').decode(token, verify=False)
    id = valid_data['user_id']
    user = User.objects.get(id=id)
    return user


def get_todos(user):
    queryset = Todos.objects.filter(user=user)
    serializer = TodosSerializer(queryset, many=True)
    return serializer


class ToDoAppViews(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        user = get_user_info(request)
        serializer = get_todos(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, format=None):
        try:
            user = get_user_info(request)
            id = request.data['id']
            Title = request.data['Title']
            Description = request.data['Description']
            Date = request.data['Date']
            Todos(user=user, id=id, Title=Title,
                  Description=Description, Date=Date).save()
            return Response(status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_406_NOT_ACCEPTABLE)

    def put(self, request, format=None):
        try:
            user = get_user_info(request)
            id = request.data['id']
            Title = request.data['Title']
            Description = request.data['Description']
            Date = request.data['Date']
            todo = Todos.objects.filter(Q(id=id) & Q(user=user))
            if todo:
                todo.update(
                    Title=Title, Description=Description, Date=Date)
                return Response(status=status.HTTP_200_OK)
            else:
                return Response(status=status.HTTP_406_NOT_ACCEPTABLE)
        except:
            return Response(status=status.HTTP_406_NOT_ACCEPTABLE)

    def delete(self, request, format=None):
        try:
            id = request.data['id']
            user = get_user_info(request)
            todo = Todos.objects.get(Q(id=id) & Q(user=user))
            if todo:
                todo.delete()
                # serializer = get_todos(user)
                return Response(status=status.HTTP_200_OK)
            else:
                return Response(status=status.HTTP_406_NOT_ACCEPTABLE)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class UserView(APIView):
    def post(self, request):   # user register
        try:
            serializer = UserSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'Exception': str(e)}, status=status.HTTP_406_NOT_ACCEPTABLE)


class ApiRoot(APIView):
    def get(self, request, format=None):
        return Response({
            'Todos': reverse('todos', request=request, format=format),
            'Register': reverse('register', request=request, format=format),
            'Login': reverse('login', request=request, format=format),
        })
