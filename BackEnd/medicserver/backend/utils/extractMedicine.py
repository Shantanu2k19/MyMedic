from openai import OpenAI
from dotenv import load_dotenv

import os

def fetch_medicine(extracted_text):
    load_dotenv()
    client = OpenAI()
    api_key = os.getenv('OPENAI_API_KEY')

    if api_key is None:
        raise ValueError("OpenAI API key not found in environment variables.")

    query = "below is the text extracted from prescription of a patient. From the given text, extract the medicines prescribed and list their name,use, dosage. give recommended if information is not provided in text. and finally give all the extra information you were able to retrieve from the text. provide it all in json format. text : '"

    response = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[
        {
        "role": "user",
        "content": query + extracted_text + "'"
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

    return json_data