from django.db import models
from django.utils.timezone import now

# Create your models here.
class Task(models.Model):
    sno = models.AutoField(primary_key=True)
    body = models.TextField()
    timestamp = models.DateTimeField(default=now)

    def __str__(self) -> str:
        return self.body[0:40] + " ..."