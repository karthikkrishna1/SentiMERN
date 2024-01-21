from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import tensorflow as tf
import pickle
from model import clean_message
import os
PORT = os.getenv('PORT')

model = tf.keras.models.load_model('sentiment_model.h5')
tokenizer = pickle.load(open('tokenizer.pkl','rb'))
app = Flask(__name__)
CORS(app)
app.config['SECRET_KEY'] = 'hsu123nxhsuqw'

@app.route('/predict', methods = ['POST'])
def predict_sentiment():
    try:
        data = request.get_json()
        print(data)
        
        clean_text = clean_message(data['text'])
        sequences = tokenizer.texts_to_sequences([clean_text])
        padded_sequences = tf.keras.preprocessing.sequence.pad_sequences(sequences, maxlen=100, padding='post')
        preds = model.predict(padded_sequences)[0]
        ans = np.argmax(preds)
        print(ans)
        if preds[ans] < 0.5:
            result = "Not so Sure"
        else:
            result = "neutral" if ans == 1 else "positive" if  ans == 2 else "negative"
        return jsonify(result)
    except:
        return jsonify("encountered error")
    
