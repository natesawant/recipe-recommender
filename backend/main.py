from fastapi import FastAPI, UploadFile
from fastapi.middleware.cors import CORSMiddleware

from api_types import RecommendationText
from embedding_recommender import EmbeddingRecommender
from transcribe import transcribe_audio

app = FastAPI()

origins = ["*"]

app.add_middleware(CORSMiddleware, allow_origins=origins, allow_credentials=True, allow_methods=["*"], allow_headers=["*"])

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