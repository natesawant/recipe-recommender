import base64

from fastapi import FastAPI, UploadFile
from fastapi.middleware.cors import CORSMiddleware

from api_types import RecommendationText

app = FastAPI()

origins = ["*"]

app.add_middleware(CORSMiddleware, allow_origins=origins, allow_credentials=True, allow_methods=["*"], allow_headers=["*"])

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/recommend/text")
def recommend_text(rec_request: RecommendationText):
    # TODO: add machine learning stuff here

    return {"recommendation": "greek food"}

@app.post("/recommend/audio")
def recommend_audio(file: UploadFile):
    with file.file as f:
        contents = f.read()

    with open('received_audio.webm', 'wb') as f:
        f.write(contents)

    # TODO: convert to mp3 here and then run transcription service

    return {"recommendation": "greek food"}