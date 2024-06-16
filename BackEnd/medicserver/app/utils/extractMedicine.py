from django.conf import settings

from app.llmModels.gemini import geminiModel 
from app.llmModels.openai import opemnAImodel

query = '''below is the text extracted from prescription of a patient. 
From the given text, extract the medicines prescribed and list their name as 'name', what are they used for as 'use',dosage in prescription or recommended dosage as 'dosage',
side effects as 'sideeffects', and the type also how it works and treats the disease it is for as 'working'.
give general recommended information if it is not provided in text. 
and finally give all the extra information you were able to retrieve from the text as 'extraInfo'. 
provide it all in json format. text : '''

model = settings.MODEL
supported_models=settings.SUPPORTED_MODELS

def getMedicineInfo(extracted_image_data, ret):
    print("extracting medicine from model")

    if model==supported_models.OPENAI:
        opemnAImodel(extracted_image_data, ret, query)
    elif model==supported_models.GEMINI:
        print("geminiModel")
        geminiModel(extracted_image_data, ret, query)
    else :
        ret["status"] = 401
        ret["mssg"] = "model not supported"
        return