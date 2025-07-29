from flask import Flask, request, jsonify
from flask_cors import CORS
import base64
import io
from PIL import Image
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.utils import img_to_array
from tensorflow.keras.preprocessing.image import img_to_array


app = Flask(__name__)
CORS(app)

model = load_model('plant_disease_prediction_model.h5')  # Replace with your model path
class_labels = ['Healthy', 'Leaf Blight', 'Powdery Mildew', 'Rust']  # Replace with your classes

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        image_data = data['image']

        header, encoded = image_data.split(",", 1)
        image_bytes = base64.b64decode(encoded)
        image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
        image = image.resize((224, 224))
        image_array = img_to_array(image) / 255.0
        image_array = np.expand_dims(image_array, axis=0)

        predictions = model.predict(image_array)
        predicted_index = np.argmax(predictions[0])
        predicted_label = class_labels[predicted_index]
        confidence = round(float(predictions[0][predicted_index]) * 100, 2)

        return jsonify({
            'disease': predicted_label,
            'confidence': confidence,
            'recommendations': get_recommendations(predicted_label)
        })

    except Exception as e:
        return jsonify({'error': str(e)})

def get_recommendations(label):
    return {
        'Healthy': ["Your crop is healthy.", "Continue regular care."],
        'Leaf Blight': ["Apply fungicide.", "Improve ventilation."],
        'Powdery Mildew': ["Use sulfur fungicide.", "Avoid overhead watering."],
        'Rust': ["Apply rust treatment.", "Remove infected leaves."]
    }.get(label, ["No specific advice available."])

if __name__ == '__main__':
    app.run(debug=True)
