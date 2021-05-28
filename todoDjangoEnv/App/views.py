from .models import *
from django.db.models import Q
from rest_framework import status
from rest_framework.views import APIView
from .serializers import *
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework_simplejwt.tokens import RefreshToken  # generate jwt manually
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.backends import TokenBackend


def get_user_info(request):
    token = request.META.get('HTTP_AUTHORIZATION', " ").split(' ')[1]
    valid_data = TokenBackend(
        algorithm='HS256').decode(token, verify=False)
    id = valid_data['user_id']
    user = Person.objects.get(id=id)
    return user

class ToDoAppViews(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        user = get_user_info(request)
        queryset = Todos.objects.filter(user=user)
        serializer = Todos_Serializers(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, format=None):
        try:
            user = get_user_info(request)
            id = request.data['Id']
            Title = request.data['Title']
            Description = request.data['Description']
            Date = request.data['Date']
            Todos(user=user, id=id, Title=Title,
                  Description=Description, Date=Date).save()
            return Response(status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_406_NOT_ACCEPTABLE)

    def put(self, request, format=None):
        id = request.data['Id']
        user = get_user_info(request)
        if Todos.objects.filter(Q(id=id) & Q(user=user)):
            Title = request.data['Title']
            Description = request.data['Description']
            Date = request.data['Date']
            Todos.objects.filter(Q(id=id) & Q(user=user)).update(
                Title=Title, Description=Description, Date=Date)
            return Response(status=status.HTTP_200_OK)
        return Response(status=status.HTTP_406_NOT_ACCEPTABLE)

    def delete(self, request, format=None):
        id = request.data['Id']
        user = get_user_info(request)
        if Todos.objects.filter(Q(id=id) & Q(user=user)):
            Todos.objects.filter(Q(id=id) & Q(user=user)).delete()
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class PersonAppViews(APIView):
    # def get(self, request, format=None):
    #     queryset = Person.objects.all()
    #     serializer = Person_Serializers(queryset, many=True)
    #     return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, format=None):   # user register
        try:
            id = request.data['Id']
            Name = request.data['Name']
            Username = request.data['Username']
            Phone = request.data['Phone']
            Email = request.data['Email']
            Password = request.data['Password']
            Gender = request.data['Gender']
            person = Person(id=id, Name=Name, Username=Username, Phone=Phone, Email=Email,
                            Password=Password, Gender=Gender)
            person.save()
            serializer = Person_Serializers(person)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except:
            return Response(serializer.errors, status=status.HTTP_406_NOT_ACCEPTABLE)

    # def put(self, request, format=None):
    #     id = request.data['id']
    #     if Person.objects.filter(id=id):
    #         Name = request.data['Name']
    #         Username = request.data['Username']
    #         Phone = request.data['Phone']
    #         Email = request.data['Email']
    #         Password = request.data['Password']
    #         Gender = request.data['Gender']
    #         Person.objects.filter(id=id).update(id=id, Name=Name, Username=Username, Phone=Phone,
    #                                             Email=Email, Password=Password, Gender=Gender)
    #         return Response(status=status.HTTP_200_OK)
    #     return Response(status=status.HTTP_406_NOT_ACCEPTABLE)

    # def delete(self, request, format=None):
    #     id = request.data['id']
    #     if Person.objects.filter(id=id):
    #         Person.objects.filter(id=id).delete()
    #         return Response(status=status.HTTP_200_OK)
    #     else:
    #         return Response(status=status.HTTP_400_BAD_REQUEST)


class LoginViews(APIView):
    def post(self, request, format=None):
        try:
            Username_Phone_Email = request.data['Username_Phone_Email']
            Password = request.data['Password']
            user = Person.objects.get((Q(Username=Username_Phone_Email) | Q(
                Phone=Username_Phone_Email) | Q(Email=Username_Phone_Email)) & Q(Password=Password))
            refresh = RefreshToken.for_user(user)
            personObj = {'id': user.id, 'Name': user.Name, 'Username': user.Username, 'Phone': user.Phone, 'Email': user.Email,
                         'Password': user.Password, 'Gender': user.Gender, 'refresh': str(refresh), 'access': str(refresh.access_token)}
            return Response(personObj, status=status.HTTP_200_OK)
        except:
            return Response({'auth': "user not exist"}, status=status.HTTP_406_NOT_ACCEPTABLE)


class ApiRoot(APIView):
    def get(self, request, format=None):
        return Response({
            'Todos': reverse('todos', request=request, format=format),
            'Persons': reverse('person', request=request, format=format),
        })
