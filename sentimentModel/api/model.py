import pandas as pd
import nltk
import string
import tensorflow as tf
import numpy as np
import pickle


df1 = pd.read_csv('C:\D-Drive\ComputerScience\SentiX\SentiX\sentimentModel\\api\chat_dataset.csv')
df2 = pd.read_csv('C:\D-Drive\ComputerScience\SentiX\SentiX\sentimentModel\\api\\train.csv', encoding='unicode_escape')
df3 = pd.read_csv('C:\D-Drive\ComputerScience\SentiX\SentiX\sentimentModel\\api\\all-data.csv',names = ["sentiment", "message"], encoding='unicode_escape')
df2 = df2[['text', 'sentiment']].rename(columns = {"text":"message"})
df = pd.concat([df1, df2, df3])

def clean_message(message):
    stopwords = nltk.corpus.stopwords.words('english')
    lemmatizer = nltk.stem.WordNetLemmatizer()
    message= message.lower()
    message_punct = ''.join([letter for letter in message if letter not in string.punctuation])
    message_cleaned = [lemmatizer.lemmatize(word) for word in nltk.word_tokenize(message_punct) if word not in stopwords]
    return ' '.join(message_cleaned)

if __name__ == '__main__':
    df['text_cleaned'] = df['message'].astype(str).apply(clean_message)
    print(df['sentiment'].value_counts())
    messages_clean = np.array(df['text_cleaned'])
    print(df)
    labels = np.array(df['sentiment'])
    tokenizer = tf.keras.preprocessing.text.Tokenizer(oov_token='<OOV>')
    tokenizer.fit_on_texts(messages_clean)
    sequences = tokenizer.texts_to_sequences(messages_clean)
    padded_sequences = tf.keras.preprocessing.sequence.pad_sequences(sequences, maxlen=100, padding='post')
    labels_encoded = np.array(list(map(lambda x:  2 if x == "positive"  else 0  if x == "negative"  else 1, labels  )))
    labels_categorical = tf.keras.utils.to_categorical(labels_encoded, num_classes=3)
    print(labels_categorical)
    no_of_words = len(tokenizer.word_index) + 1
    model = tf.keras.Sequential([
        tf.keras.layers.Embedding(no_of_words, 32),
        tf.keras.layers.Bidirectional(tf.keras.layers.LSTM(32, activation='relu')),
        tf.keras.layers.Dense(128, activation = 'relu'),
        tf.keras.layers.Dense(3, activation='softmax')
    ])

    model.compile( optimizer=tf.keras.optimizers.RMSprop(learning_rate=0.01), loss='categorical_crossentropy', metrics = ['accuracy'])

    model.fit(padded_sequences, labels_categorical, batch_size = 32, epochs = 5)

    model.save('sentiment_model.h5')
    pickle.dump(tokenizer, open('tokenizer.pkl','wb'))
