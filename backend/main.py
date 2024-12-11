from fastapi import FastAPI, UploadFile
from fastapi.middleware.cors import CORSMiddleware

from dotenv import dotenv_values

from api_types import RecommendationText
from embedding_recommender import EmbeddingRecommender
from bow_recommender import BoWRecommender
from transcribe import transcribe_audio

app = FastAPI()

origins = ["*"]

app.add_middleware(CORSMiddleware, allow_origins=origins, allow_credentials=True, allow_methods=["*"], allow_headers=["*"])

config = dotenv_values('.env')

if not config.get('RECOMMENDER'):
    raise Exception("No recommender type set in .env (\"bow\" or \"embed\")")

recommender_method = config.get('RECOMMENDER')

if recommender_method == "bag-of-words":
    recommender = BoWRecommender()
elif recommender_method == "embeddings":
    recommender = EmbeddingRecommender()

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/recommend/text")
def recommend_text(rec_request: RecommendationText):
    recipes = recommender.recommend(rec_request.text)
    return {"recommendations": recipes}

@app.post("/recommend/audio")
def recommend_audio(file: UploadFile):
    with file.file as f:
        contents = f.read()

    with open('received_audio.webm', 'wb') as audio_file:
        audio_file.write(contents)

    text = transcribe_audio('received_audio.webm')

    return {"recommendations": recommender.recommend(text)}