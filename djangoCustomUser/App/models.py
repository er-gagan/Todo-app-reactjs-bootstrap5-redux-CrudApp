from django.db import models

class User(models.Model):
    name = models.CharField(max_length=100)
    username = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=15)
    gender = models.CharField(max_length=10)
    auth_token = models.CharField(max_length=100)

    def __str__(self):
        return self.Title

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
        return self.user+self.otp
        
# superuser: gagan