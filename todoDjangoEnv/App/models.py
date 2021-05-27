from django.db import models

class Todos(models.Model):
    Title = models.CharField(max_length=200)
    Description = models.TextField()
    Date = models.CharField(max_length=200)

    def __str__(self):
        self.Title

class Person(models.Model):
    Name = models.CharField(max_length=200)
    Username = models.CharField(max_length=30)
    Phone = models.CharField(max_length=10)
    Email = models.EmailField()
    Password = models.CharField(max_length=30)
    Confirm_Password = models.CharField(max_length=30)
    Gender = models.CharField(max_length=10)

    def __str__(self):
        self.Name
