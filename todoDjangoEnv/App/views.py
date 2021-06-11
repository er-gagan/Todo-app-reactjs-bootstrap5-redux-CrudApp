from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.backends import TokenBackend
from rest_framework.permissions import IsAuthenticated
from django.views.decorators.csrf import csrf_exempt
from todoBackend.settings import EMAIL_HOST_USER
from django.http.response import HttpResponse
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework.views import APIView
from django.core.mail import send_mail
from rest_framework import status
from django.db.models import Q
from .serializers import *
from .models import *
import random
import string
import uuid


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


class socialSigninView(APIView):
    def post(self, request):
        try:
            username = request.data['username']
            email = request.data['email']
            photoUrl = request.data['photoUrl']
            company = request.data['company']
            uid = request.data['uid']
            if User.objects.filter(Q(username=username)&Q(email=email)):
                return Response(status=status.HTTP_200_OK)
            else:
                user = User(username=username, email=email)
                user.set_password(email)
                user.save()
                socialSignin(user=user, photoUrl=photoUrl,
                        provider=company, uid=uid).save()
                return Response(status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class changePasswordView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            user = get_user_info(request)
            currentPassword = request.data['currentPassword']
            newPassword = request.data['newPassword']
            password = user.check_password(currentPassword)
            if password:
                user.set_password(newPassword)
                user.save()
                return Response(status=status.HTTP_202_ACCEPTED)
            else:
                return Response(status=status.HTTP_406_NOT_ACCEPTABLE)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)


def send_mail_after_registration(name, email, auth_token):
    subject = 'Your accounts need to be verified'
    message = f'Hello {name}\n\nYou registered an account on [todoApp], before being able to use your account you need to verify that this is your email address by clicking here: http://localhost:3000/verify/{auth_token}\n\nKind Regards, [todoApp]'
    recepient = email
    send_mail(subject, message, EMAIL_HOST_USER,
              [recepient], fail_silently=False)


class UserView(APIView):
    def post(self, request):   # user register
        try:
            # serializer = UserSerializer(data=request.data)
            name = request.data['name']
            username = request.data['username']
            password = request.data['password']
            email = request.data['email']
            phone = request.data['phone']
            gender = request.data['gender']
            auth_token = str(uuid.uuid4())
            user = User.objects.create(
                name=name, username=username, email=email, phone=phone, gender=gender, auth_token=auth_token)
            user.set_password(password)
            user.is_active = False
            user.save()
            send_mail_after_registration(name, email, auth_token)
            return Response(status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'Exception': str(e)}, status=status.HTTP_406_NOT_ACCEPTABLE)


@csrf_exempt
def VerifyAccount(request, auth_token):
    try:
        user = User.objects.get(auth_token=auth_token)
        if user:
            if user.is_active:
                return HttpResponse(status=status.HTTP_208_ALREADY_REPORTED)
            else:
                user.is_active = True
                user.save()
                return HttpResponse(status=status.HTTP_200_OK)
        else:
            return HttpResponse(status=status.HTTP_400_BAD_REQUEST)
    except:
        return HttpResponse(status=status.HTTP_406_NOT_ACCEPTABLE)


def emailSend(otp, email):
    subject = 'Welcome to Todo App'
    message = 'OTP = '+str(otp)+"\nThis is a valid otp"
    recepient = email
    send_mail(subject, message, EMAIL_HOST_USER,
              [recepient], fail_silently=False)


class forgot_password_email_verification_View(APIView):
    def post(self, request):
        try:
            email = request.data['email']
            user = User.objects.get(email=email)
            if user:
                otp = ''.join(random.choice(
                    string.ascii_uppercase + string.digits) for _ in range(6))
                # Otp sent on email written logic
                OtpVerify.objects.filter(user=user).delete()
                OtpVerify(user=user, otp=otp).save()

                emailSend(otp, email)
                return Response(status=status.HTTP_202_ACCEPTED)
            else:
                return Response(status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class forgot_password_otp_verification_View(APIView):
    def post(self, request):
        try:
            otp = request.data['otp']
            email = request.data['email']
            user = User.objects.get(email=email)

            verifyOtp = OtpVerify.objects.get(Q(otp=otp) & Q(user=user))
            if verifyOtp:
                return Response(status=status.HTTP_202_ACCEPTED)
            else:
                return Response(status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class forgot_password_with_new_password_View(APIView):
    def post(self, request):
        otp = request.data['otp']
        email = request.data['email']
        password = request.data['password']

        user = User.objects.get(email=email)

        verifyOtp = OtpVerify.objects.get(Q(otp=otp) & Q(user=user))
        if verifyOtp:
            user.set_password(password)
            user.save()
            verifyOtp.delete()
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class ApiRoot(APIView):
    def get(self, request, format=None):
        return Response({
            'Todos': reverse('todos', request=request, format=format),
            'Register': reverse('register', request=request, format=format),
            'Login': reverse('login', request=request, format=format),
        })
