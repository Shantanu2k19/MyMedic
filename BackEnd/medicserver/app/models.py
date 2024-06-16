from django.db import models

class UserDetails(models.Model):
    username = models.CharField(max_length=150, primary_key=True)
    files_list = models.JSONField(default=list) 

    def __str__(self):
        return self.username

class FileDetails(models.Model):
    file_name = models.CharField(primary_key=True, default="default_name", editable=False, max_length=150)
    json_image_data = models.JSONField(default=dict)
    str_image_text = models.TextField(default='No Data Found!!')
    data_from_llm = models.JSONField(default=dict)
    file_url = models.CharField(max_length=150, default='noimagefound')

    def __str__(self):
        return str(self.file_name)
