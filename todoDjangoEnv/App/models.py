from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    first_name = last_name = None   # delete fields
    name = models.CharField(max_length=100)
    email = models.EmailField(blank=False, null=False, unique=True)
    phone = models.CharField(max_length=15, blank=False, unique=True, null=False)
    gender = models.CharField(max_length=10)
    auth_token = models.CharField(max_length=100)
    user_pic = models.ImageField(upload_to="userPics", default="userPics/blankUserProfile.png", null=True)

    def __str__(self):
        return self.username


class Todos(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    id = models.CharField(max_length=100, primary_key=True)
    Title = models.CharField(max_length=200)
    Description = models.TextField()
    Date = models.CharField(max_length=200)

    def __str__(self):
        return self.Title


class OtpVerify(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    otp = models.CharField(max_length=6)

    def __str__(self):
        return str(self.user)+" "+str(self.otp)


class socialSignin(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    photoUrl = models.URLField()
    provider = models.CharField(max_length=20)
    uid = models.CharField(max_length=200)

    def __str__(self):
        return self.user.username
# superuser: gagan
