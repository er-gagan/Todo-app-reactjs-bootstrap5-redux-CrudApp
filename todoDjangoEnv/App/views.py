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
from django.shortcuts import render
from rest_framework import status
from django.db.models import Q
from .serializers import *
from pathlib import Path
from .models import *
import random
import string
import uuid

import os


def test(request):
    return render(request, "test.html")


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
        try:
            user = get_user_info(request)
            serializer = get_todos(user)
            response_data = {
                "status": "success",
                "status_code": status.HTTP_200_OK,
                "message": "Data fatched successfully!",
                "data": serializer.data
            }
            return Response(data=response_data, status=status.HTTP_200_OK)
        except Exception as e:
            response_data = {
                "status": "failed",
                "status_code": status.HTTP_406_NOT_ACCEPTABLE,
                "message": str(e),
            }
            return Response(data=response_data, status=status.HTTP_406_NOT_ACCEPTABLE)

    def post(self, request, format=None):
        try:
            user = get_user_info(request)
            id = request.data['id']
            Title = request.data['Title']
            Description = request.data['Description']
            Date = request.data['Date']
            Todos(user=user, id=id, Title=Title,
                  Description=Description, Date=Date).save()
            response_data = {
                "status": "success",
                "status_code": status.HTTP_200_OK,
                "message": "todo created successfully",
            }
            return Response(data=response_data, status=status.HTTP_200_OK)
        except Exception as e:
            response_data = {
                "status": "failed",
                "status_code": status.HTTP_406_NOT_ACCEPTABLE,
                "message": str(e),
            }
            return Response(data=response_data, status=status.HTTP_406_NOT_ACCEPTABLE)

    def put(self, request, format=None):
        try:
            user = get_user_info(request)
            id = request.data['id']
            Title = request.data['Title']
            Description = request.data['Description']
            Date = request.data['Date']
            todo = Todos.objects.filter(Q(id=id) & Q(user=user))
            if todo:
                todo.update(Title=Title, Description=Description, Date=Date)
                response_data = {
                    "status": "success",
                    "status_code": status.HTTP_200_OK,
                    "message": "todo updated successfully",
                }
                return Response(data=response_data, status=status.HTTP_200_OK)
            else:
                response_data = {
                    "status": "failed",
                    "status_code": status.HTTP_406_NOT_ACCEPTABLE,
                    "message": "This todo isn't exist in database",
                }
                return Response(data=response_data, status=status.HTTP_406_NOT_ACCEPTABLE)
        except Exception as e:
            response_data = {
                "status": "failed",
                "status_code": status.HTTP_406_NOT_ACCEPTABLE,
                "message": str(e),
            }
            return Response(data=response_data, status=status.HTTP_406_NOT_ACCEPTABLE)

    def delete(self, request, format=None):
        try:
            id = request.data['id']
            user = get_user_info(request)
            todo = Todos.objects.get(Q(id=id) & Q(user=user))
            if todo:
                todo.delete()
                # serializer = get_todos(user)
                response_data = {
                    "status": "success",
                    "status_code": status.HTTP_200_OK,
                    "message": "todo deleted successfully",
                }
                return Response(data=response_data, status=status.HTTP_200_OK)
            else:
                response_data = {
                    "status": "failed",
                    "status_code": status.HTTP_406_NOT_ACCEPTABLE,
                    "message": "todo isn't exist in database",
                }
                return Response(data=response_data, status=status.HTTP_406_NOT_ACCEPTABLE)
        except Exception as e:
            response_data = {
                "status": "failed",
                "status_code": status.HTTP_400_BAD_REQUEST,
                "message": str(e),
            }
            return Response(data=response_data, status=status.HTTP_400_BAD_REQUEST)


class socialSigninView(APIView):
    def post(self, request):
        try:
            username = request.data['username']
            email = request.data['email']
            photoUrl = request.data['photoUrl']
            company = request.data['company']
            uid = request.data['uid']
            if User.objects.filter(Q(username=username) & Q(email=email)):
                response_data = {
                    "status": "success",
                    "status_code": status.HTTP_200_OK,
                    "message": "user already exist.",
                }
                return Response(data=response_data, status=status.HTTP_200_OK)
            else:
                user = User(username=username, email=email, user_pic=photoUrl)
                user.set_password(email)
                user.save()
                socialSignin(user=user, provider=company, uid=uid).save()
                response_data = {
                    "status": "success",
                    "status_code": status.HTTP_200_OK,
                    "message": "user created successfully",
                }
                return Response(data=response_data, status=status.HTTP_200_OK)
        except Exception as e:
            response_data = {
                "status": "failed",
                "status_code": status.HTTP_400_BAD_REQUEST,
                "message": str(e),
            }
            return Response(data=response_data, status=status.HTTP_400_BAD_REQUEST)


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
                response_data = {
                    "status": "success",
                    "status_code": status.HTTP_202_ACCEPTED,
                    "message": "password has successfully changed",
                }
                return Response(data=response_data, status=status.HTTP_202_ACCEPTED)
            else:
                response_data = {
                    "status": "failed",
                    "status_code": status.HTTP_406_NOT_ACCEPTABLE,
                    "message": "wrong password.",
                }
                return Response(data=response_data, status=status.HTTP_406_NOT_ACCEPTABLE)
        except Exception as e:
            response_data = {
                "status": "failed",
                "status_code": status.HTTP_400_BAD_REQUEST,
                "message": str(e),
            }
            return Response(data=response_data, status=status.HTTP_400_BAD_REQUEST)


def send_mail_after_registration(name, email, auth_token):
    subject = 'Your accounts need to be verified'
    message = f'Hello {name}\n\nYou registered an account on [todoApp], before being able to use your account you need to verify that this is your email address by clicking here: http://localhost:3000/verify/{auth_token}\n\nKind Regards, [todoApp]'
    recipient = email
    send_mail(subject, message, EMAIL_HOST_USER,
              [recipient], fail_silently=False)


class UserView(APIView):
    def post(self, request):   # user register
        try:
            name = request.data['name']
            username = request.data['username']
            password = request.data['password']
            email = request.data['email']
            phone = request.data['phone']
            gender = request.data['gender']
            profilePic = request.data['profilePic']
            auth_token = str(uuid.uuid4())
            user = User.objects.create(
                name=name, username=username, email=email, phone=phone, gender=gender, auth_token=auth_token, user_pic=profilePic)
            user.set_password(password)
            user.is_active = False
            user.save()
            send_mail_after_registration(name, email, auth_token)
            response_data = {
                "status": "success",
                "status_code": status.HTTP_201_CREATED,
                "message": "user is registered successfully, we sent a mail to user given mail id for email verification and account activation.",
            }
            return Response(data=response_data, status=status.HTTP_201_CREATED)
        except Exception as e:
            response_data = {
                "status": "failed",
                "status_code": status.HTTP_400_BAD_REQUEST,
                "message": str(e),
            }
            return Response(data=response_data, status=status.HTTP_400_BAD_REQUEST)


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


class loginCredentialsView(APIView):
    def post(self, request):
        try:
            userEmailPhone = request.data['userEmailPhone']
            password = request.data['password']
            user = User.objects.get(Q(username=userEmailPhone) | Q(
                email=userEmailPhone) | Q(phone=userEmailPhone))
            if user.check_password(password):
                return Response({'username': user.username}, status=status.HTTP_200_OK)
            else:
                return Response(status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response(status=status.HTTP_503_SERVICE_UNAVAILABLE)


class getUserView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            user = get_user_info(request)
            serializer = UserSerializer(user)
            return Response({'data': serializer.data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'Exception': e}, status=status.HTTP_400_BAD_REQUEST)


class deleteUserView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            user = get_user_info(request)
            user.delete()
            return Response(status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'Exception': e}, status=status.HTTP_400_BAD_REQUEST)


class updateUserView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def put(self, request):
        try:
            user = get_user_info(request)
            user.name = request.data['name']
            user.username = request.data['username']
            user.email = request.data['email']
            user.phone = request.data['phone']
            user.gender = request.data['gender']
            profilePic = request.data['profilePic']
            if (str(user.user_pic) == str(profilePic)):
                pass
            else:
                BASE_DIR = Path(__file__).resolve().parent.parent
                my_path = f"{BASE_DIR}\\media\\{user.user_pic}"
                os.remove(my_path)
                user.user_pic = profilePic
            user.save()
            serializer = UserSerializer(user)
            return Response({'data': serializer.data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'Exception': e}, status=status.HTTP_400_BAD_REQUEST)


def emailSend(otp, email):
    subject = 'Welcome to Todo App'
    message = 'OTP = '+str(otp)+"\nThis is a valid otp"
    recipient = email
    send_mail(subject, message, EMAIL_HOST_USER,
              [recipient], fail_silently=False)


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
