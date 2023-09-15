from flask import Flask, request, jsonify
import numpy as np
import tensorflow as tf
import pickle
from model import clean_message

model = tf.keras.models.load_model('sentiment_model.h5')
tokenizer = pickle.load(open('tokenizer.pkl','rb'))

def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'hsu123nxhsuqw'

    @app.route('/predict', methods = ['POST'])
    def predict_sentiment():
        data = request.get_json()
        print(data)
      
        clean_text = clean_message(data['text'])
        sequences = tokenizer.texts_to_sequences([clean_text])
        padded_sequences = tf.keras.preprocessing.sequence.pad_sequences(sequences, maxlen=100, padding='post')
        preds = model.predict(padded_sequences)[0]
        ans = np.argmax(preds)
        print(ans)
        result = "neutral" if ans == 1 else "positive" if  ans == 2 else "negative"
        return jsonify(result)


    return app