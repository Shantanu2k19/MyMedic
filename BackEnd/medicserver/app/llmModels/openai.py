from openai import OpenAI
from dotenv import load_dotenv
import os

def opemnAImodel(text, ret, query):
    load_dotenv()
    client = OpenAI()
    api_key = os.getenv('OPENAI_API_KEY')

    print(query)

    if api_key is None:
        ret["status"]=401
        ret["mssg"]="OpenAI API key not found in environment variables."
        return

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