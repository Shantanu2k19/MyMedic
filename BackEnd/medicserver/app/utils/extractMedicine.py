from openai import OpenAI
from dotenv import load_dotenv

import os

def getMedicineInfo(text, ret):
    # return json.dumps({"medicine":"lol"})
    
    load_dotenv()
    client = OpenAI()
    api_key = os.getenv('OPENAI_API_KEY')

    if api_key is None:
        ret["status"]=401
        ret["mssg"]="OpenAI API key not found in environment variables."
        return

    query = '''below is the text extracted from prescription of a patient. 
    From the given text, extract the medicines prescribed and list their name,use, dosage. 
    give recommended if information is not provided in text. 
    and finally give all the extra information you were able to retrieve from the text. 
    provide it all in json format. text : '''

    try:
        response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {
            "role": "user",
            "content": query + text + "'"
            }
        ],
        temperature=1,
        max_tokens=511,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0
        )

        json_data = response.choices[0].message.content
        print(json_data)
        ret["data"] = json_data
    except Exception as e:
        ret["status"]=400
        ret["mssg"]=str(e)[0:200]
    
    return 