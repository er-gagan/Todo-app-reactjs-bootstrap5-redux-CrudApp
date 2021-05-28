from django.db import models

class Person(models.Model):
    id = models.CharField(max_length=100, primary_key=True) # 'id' is small letter is must
    Name = models.CharField(max_length=200)
    Username = models.CharField(max_length=30)
    Phone = models.CharField(max_length=10)
    Email = models.EmailField()
    Password = models.CharField(max_length=30)
    Gender = models.CharField(max_length=10)
    
    def __str__(self):
        return self.Name

class Todos(models.Model):
    user = models.ForeignKey(Person, on_delete=models.CASCADE)
    id = models.CharField(max_length=100, primary_key=True)
    Title = models.CharField(max_length=200)
    Description = models.TextField()
    Date = models.CharField(max_length=200)

    def __str__(self):
        return self.Title

# superuser: gagan