from dotenv import dotenv_values
from openai import OpenAI

config = dotenv_values(".env")

MONGO_URI = config["MONGO_URI"]
OPENAI_API_KEY = config["OPENAI_API_KEY"]
DB_NAME = "recipe-vectors"
COLLECTION_NAME = "recipes"
INDEX_NAME = "embedding_index"

def transcribe_audio(path):
    client = OpenAI(api_key=OPENAI_API_KEY)

    print('Transcribing...')

    with open(path, 'rb') as audio_file:
        transcription = client.audio.transcriptions.create(
            model="whisper-1", 
            file=audio_file
        )

    print("Text:", transcription.text)

    return transcription.text