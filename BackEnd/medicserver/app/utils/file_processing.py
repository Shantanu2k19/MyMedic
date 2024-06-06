from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from django.conf import settings
import os
from app.models import UserDetails, FileDetails
from datetime import datetime

def processFile(file, username):

    metadata = extractImageData(file)

    current_datetime = datetime.now()
    file_uuid = current_datetime.strftime("%d_%m_%Y_%H_%M_%S")
    fname, file_extension = os.path.splitext(file.name)
    fileName = username[0:5]+"_"+file.name[0:5]+"_"+str(file_uuid)+file_extension
    
    file_name = default_storage.save(fileName, ContentFile(file.read()))
    file_url = os.path.join('/media/', file_name)

    user_files, _ = UserDetails.objects.get_or_create(username=username)
    user_files.files_list.append(str(fileName))
    user_files.save()
    
    FileDetails.objects.create(
        file_name=fileName,
        metadata=metadata
    )
    metadata["file_url"]=file_url
    return metadata


def extractImageData(file):
    return {"a":"b"}