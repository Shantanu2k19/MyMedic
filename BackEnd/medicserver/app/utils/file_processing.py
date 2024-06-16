from django.core.files.storage import default_storage
from django.core.files.base import ContentFile

import os
from app.models import UserDetails, FileDetails
from datetime import datetime

from app.utils.extractTextData import extractImageTextData, extractPdfTextData
from app.utils.extractMedicine import getMedicineInfo

from django.core.files import File

import cv2
import numpy as np
import tempfile

def processFile(uploaded_image_file, username, ret):
    print("processing file")

    current_datetime = datetime.now()
    file_uuid = current_datetime.strftime("%d_%m_%Y_%H_%M_%S")
    fname, file_extension = os.path.splitext(uploaded_image_file.name)
    fileName = username[0:5]+"_"+uploaded_image_file.name[0:5]+"_"+str(file_uuid)+file_extension
    
    #extension handling 
    if(
        file_extension.lower()=='.png' or 
        file_extension.lower()=='.jpg' or 
        file_extension!='.jpeg'
        ):
        extracted_image_data = extractImageTextData(uploaded_image_file, ret)
    
    elif file_extension.lower()=='.pdf':
        extracted_image_data = extractPdfTextData(file, ret)

    else:
        ret["status"] = 401
        ret["mssg"] = "unsupported file extension"
        return
    
    if(ret["status"]!=200):
        return

    print("text extracted")
    
    new_np_image = extracted_image_data["new_np_image"]
    # print("file type:"+str(type(file)))
    
    getMedicineInfo(extracted_image_data, ret)
    if(ret["status"]!=200):
        print("status not zero")
        return
    
    print("extraction success, saving file")

    new_np_image = cv2.cvtColor(new_np_image, cv2.COLOR_BGR2RGB)
    #cv2.imwrite('output_image_quality_100_resized.jpg', new_np_image, [cv2.IMWRITE_JPEG_QUALITY, 100])
    
    temp_file = tempfile.NamedTemporaryFile(delete=False, suffix='.jpg')

    # Save the resized image to the temporary file with specific quality
    cv2.imwrite(temp_file.name, new_np_image, [cv2.IMWRITE_JPEG_QUALITY, 100])

    # Open the temporary file and save it using default_storage
    saved_file_name = ""
    with open(temp_file.name, 'rb') as f:
        django_file = File(f)
        saved_file_name = default_storage.save(fileName, django_file)

    # Clean up the temporary file
    os.remove(temp_file.name)

    # file_name = default_storage.save(fileName, ContentFile(file.read()))
    file_url = os.path.join('/media/', saved_file_name)

    print("url is "+str(file_url))
    print("name is "+fileName)
    
    try:
        user_files, _ = UserDetails.objects.get_or_create(username=username)
        user_files.files_list.append(str(file_url))
        user_files.save()
        
        FileDetails.objects.create(
            file_name = fileName,
            json_image_data = extracted_image_data["json_image_data"],
            str_image_text = extracted_image_data["str_image_text"],
            data_from_llm = ret["data"],
            file_url = file_url,
        )
        ret["file_url"] = file_url
        
    except Exception as e:
        print("exception occured")
        ret["status"]=400
        ret["mssg"]=str(e)[0:200]
 
    return