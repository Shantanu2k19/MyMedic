from django.core.files.storage import default_storage
from django.core.files.base import ContentFile

import os
from app.models import UserDetails, FileDetails
from datetime import datetime

from app.utils.extractTextData import extractImageTextData, extractPdfTextData
from app.utils.extractMedicine import getMedicineInfo

def processFile(file, username, ret):

    current_datetime = datetime.now()
    file_uuid = current_datetime.strftime("%d_%m_%Y_%H_%M_%S")
    fname, file_extension = os.path.splitext(file.name)
    fileName = username[0:5]+"_"+file.name[0:5]+"_"+str(file_uuid)+file_extension
    
    metadata={}
    text = ""
    #extension handling 
    if(
        file_extension.lower()=='.png' or 
        file_extension.lower()=='.jpg' or 
        file_extension!='.jpeg'
        ):
        extractImageTextData(file, text, ret)
    
    elif file_extension.lower()=='.pdf':
        extractPdfTextData(file, text, ret)

    else:
        ret["status"] = 401
        ret["mssg"] = "unsupported file extension"
        return
    
    if(ret["status"]!=200):
        return

    getMedicineInfo(text, ret)
    if(ret["status"]!=200):
        return
    
    print("extraction success, saving file")
    file_name = default_storage.save(fileName, ContentFile(file.read()))
    file_url = os.path.join('/media/', file_name)

    user_files, _ = UserDetails.objects.get_or_create(username=username)
    user_files.files_list.append(str(fileName))
    user_files.save()
    
    FileDetails.objects.create(
        file_name = fileName,
        metadata = ret["data"]
    )
    ret["file_url"]=file_url
    return