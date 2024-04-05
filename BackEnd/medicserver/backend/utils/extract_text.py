import pytesseract
import cv2
import re
from PIL import Image

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

def extractTextFromImage(image_path):
    print(image_path)

    #process image
    img = processImage(image_path)

    #extract text 
    pytesseract.pytesseract.tesseract_cmd = r'/usr/bin/tesseract'
    text = pytesseract.image_to_string(img, lang='eng')

    #clean text 
    text = processText(text)

    return text

def processText(text):
    text = text.replace('\n', '')
    text = re.sub(r'[^\w\s]', '', text)
    return text
    