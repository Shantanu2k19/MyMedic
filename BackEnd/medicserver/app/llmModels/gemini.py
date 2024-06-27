import os
from dotenv import load_dotenv
import google.generativeai as genai
from google.oauth2 import service_account
import google.auth

def geminiModel(extracted_image_data, ret, query):
    print("gemini")
    load_dotenv()
    api_key = os.getenv('GEMINI_KEY')
    if api_key is None:
        print("api key is none")
        ret["status"]=401
        ret["mssg"]="Gemini API key not found in environment variables."
        return

    service_account_path = 'mymedic-gcp.json'

    if "GOOGLE_APPLICATION_CREDENTIALS" not in os.environ:
        print("Environment variable 'GOOGLE_APPLICATION_CREDENTIALS' is not set.")
        ret["status"]=401
        ret["mssg"]="Environment variable 'GOOGLE_APPLICATION_CREDENTIALS' is not set."
        return

    # Optionally, you can set this as an environment variable
    os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = service_account_path

    # Ensure the credentials are loaded properly
    credentials = service_account.Credentials.from_service_account_file(service_account_path)

    genai.configure()
    print("gemini querrying")

    # ref https://ai.google.dev/api/python/google/generativeai/GenerativeModel
    generation_config = {
    "temperature": 1,
    "top_p": 0.95,
    "top_k": 64,
    "max_output_tokens": 8192,
    "response_mime_type": "text/plain",
    }

    model = genai.GenerativeModel(
    model_name="gemini-1.5-pro",
    generation_config=generation_config,
    # credentials=credentials,
    )
    query = query + extracted_image_data["str_image_text"]
    #print(query)
    try:
        chat_session = model.start_chat(
        history=[
        ]
        )
        
        response = chat_session.send_message(query)
        # print(response.text)
        ret["data"] = response.text
        return response.text

    except Exception as e:
        print("exception occured")

        ret["status"]=400
        ret["mssg"]=str(e)[0:200]

def upload_to_gemini(path, mime_type=None):
    # ref https://ai.google.dev/gemini-api/docs/prompting_with_media
    file = genai.upload_file(path, mime_type=mime_type)
    print(f"Uploaded file '{file.display_name}' as: {file.uri}")
    return file
