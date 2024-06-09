import pytesseract
import cv2
import tempfile
import re
from PIL import Image

def extractImageTextData(file, text, ret):

    with tempfile.NamedTemporaryFile(delete=False) as temp_file:
        for chunk in file.chunks():
            temp_file.write(chunk)
        temp_file_path = temp_file.name

    #process image
    img = processImage(temp_file_path)
    temp_file.close()

    #extract text 
    pytesseract.pytesseract.tesseract_cmd = r'/usr/bin/tesseract'
    text = pytesseract.image_to_string(img, lang='eng')

    #clean text 
    text = processText(text)

    return

def extractPdfTextData(file, text, ret):
    ret["status"] = 401
    ret["mssg"] = "pdf files not supported yet"
    return 


def processImage(image_path):
    img = cv2.imread(image_path, flags=cv2.IMREAD_GRAYSCALE)
    new_img = cv2.adaptiveThreshold(
        img, 255,
        cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
        cv2.THRESH_BINARY,
        61,
        11
    )
    return new_img

def processText(text):
    text = text.replace('\n', '')
    text = re.sub(r'[^\w\s]', '', text)
    return text