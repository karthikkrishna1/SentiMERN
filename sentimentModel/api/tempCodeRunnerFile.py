
if __name__ == '__main__':
    df['text_cleaned'] = df['message'].apply(clean_message)
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
