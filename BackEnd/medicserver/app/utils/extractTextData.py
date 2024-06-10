import pytesseract
import cv2
import tempfile
import re
from PIL import Image
from pytesseract import Output

def extractImageTextData(file, text, ret):

    with tempfile.NamedTemporaryFile(delete=False) as temp_file:
        for chunk in file.chunks():
            temp_file.write(chunk)
        temp_file_path = temp_file.name

    #process image
    img = processImage(temp_file_path)
    temp_file.close()

    #extract text 
    text = extractTextAndDraw(img, text)
    pytesseract.pytesseract.tesseract_cmd = r'/usr/bin/tesseract'
    text = pytesseract.image_to_string(img, lang='eng')

    #clean text 
    text = processText(text)

    return

def extractTextAndDraw(img, text):
    data = pytesseract.image_to_data(img, output_type=Output.DICT)

    # Create a dictionary to store blocks
    blocks = {}

    # Iterate over each text element
    for i in range(len(data['text'])):
        if int(data['conf'][i]) > 0:  # Only consider text with confidence > 0
            block_num = data['block_num'][i]
            text = data['text'][i]
            text = clean_text(text)
            if text == "":
                continue
            left, top, width, height = data['left'][i], data['top'][i], data['width'][i], data['height'][i]

            # Add the text to the corresponding block
            if block_num not in blocks:
                blocks[block_num] = {'text': text, 'left': left, 'top': top, 'width': width, 'height': height}
            else:
                # Extend the boundaries of the block
                blocks[block_num]['left'] = min(blocks[block_num]['left'], left)
                blocks[block_num]['top'] = min(blocks[block_num]['top'], top)
                blocks[block_num]['width'] = max(blocks[block_num]['width'], left + width - blocks[block_num]['left'])
                blocks[block_num]['height'] = max(blocks[block_num]['height'], top + height - blocks[block_num]['top'])
                blocks[block_num]['text'] += ' ' + text  # Concatenate additional text

    # Create a copy of the image to draw the rectangles
    img_with_blocks = img.copy()

    # Draw a rectangle around each block and print text
    for block_num, block_data in blocks.items():
        left, top, width, height = block_data['left'], block_data['top'], block_data['width'], block_data['height']
        cv2.rectangle(img_with_blocks, (left, top), (left + width, top + height), (0, 255, 0), 10)
        cv2.putText(img_with_blocks, str(block_num), (left, top - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (36, 255, 12), 7)
        print(f"Block {block_num} Text: {block_data['text']}")

    # Convert BGR to RGB for displaying with matplotlib
    img_rgb = cv2.cvtColor(img_with_blocks, cv2.COLOR_BGR2RGB)

    # Display the image with bounding boxes around blocks
    plt.figure(figsize=(10, 10))
    plt.imshow(img_rgb)
    plt.title("Image with OCR Bounding Boxes Around Blocks")
    plt.axis('off')
    plt.show()

    cv2.imwrite('output_image.png', img_rgb, [cv2.IMWRITE_PNG_COMPRESSION, 0])

    new_img2 = cv2.cvtColor(new_img, cv2.COLOR_BGR2RGB)
    plt.figure(figsize=(10, 10))
    plt.imshow(new_img2)
    plt.title("Image with OCR Blwmds")
    plt.axis('off')
    plt.show()

def clean_text(text):
    # Remove special characters
    text = re.sub(r'[^a-zA-Z0-9\s]', '', text)
    # Replace multiple spaces with a single space
    text = re.sub(r'\s+', ' ', text)
    return text.strip()  # Remove leading and trailing spaces


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

def extractPdfTextData(file, text, ret):
    ret["status"] = 401
    ret["mssg"] = "pdf files not supported yet"
    return 
