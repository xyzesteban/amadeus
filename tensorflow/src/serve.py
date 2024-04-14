from flask import Flask, request, jsonify
import tensorflow as tf
import numpy as np
from PIL import Image
from io import BytesIO
import boto3

# Initialize Flask application
app = Flask(__name__)

# Load your TensorFlow model
model = None  # Load the model outside the request handler

# Load the model when the application starts
@app.before_first_request
def load_model():
    global model
    model = tf.keras.models.load_model('/model')

# Define a route for prediction
@app.route('/predict', methods=['POST'])
def predict():
    # Get the image key from the request
    image_key = request.json.get('image_key')

    # Fetch the image file from Amazon S3
    image_data = fetch_image_from_s3(image_key)

    # Convert the image data to a numpy array
    image_array = preprocess_image(image_data)

    # Perform inference using the loaded model
    prediction = model.predict(np.expand_dims(image_array, axis=0))

    # Return the prediction as JSON
    return jsonify({'prediction': prediction.tolist()})

def fetch_image_from_s3(image_key):
    # Initialize S3 client
    s3 = boto3.client('s3')

    # Fetch the image file from Amazon S3
    try:
        response = s3.get_object(Bucket='your_bucket_name', Key=image_key)
        image_data = response['Body'].read()
    except Exception as e:
        # Handle errors, such as file not found
        return None

    return image_data

def preprocess_image(image_data):
    # Read the image data using PIL
    image = Image.open(BytesIO(image_data))

    # Perform any necessary preprocessing on the image
    # For example, resize the image to match the input size expected by your model
    image = image.resize((256, 256))  # Adjust the size according to your model's input shape

    # Convert the image to a numpy array
    image_array = np.array(image)

    return image_array

if __name__ == '__main__':
    # Run the Flask application
    app.run(host='0.0.0.0', port=5000)
