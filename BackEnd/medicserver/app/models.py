from django.db import models

class UserDetails(models.Model):
    username = models.CharField(max_length=150, primary_key=True)
    files_list = models.JSONField(default=list) 

    def __str__(self):
        return self.username

class FileDetails(models.Model):
    file_name = models.CharField(primary_key=True, default="default_name", editable=False, max_length=150)
    metadata = models.JSONField()

    def __str__(self):
        return str(self.file_name)
