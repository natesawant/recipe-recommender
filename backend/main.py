from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from api_types import RecommendationRequest

app = FastAPI()

origins = ["*"]

app.add_middleware(CORSMiddleware, allow_origins=origins, allow_credentials=True, allow_methods=["*"], allow_headers=["*"])

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/recommend")
def recommend_recipe(rec_request: RecommendationRequest):
    if not rec_request.audio and not rec_request.text:
        raise HTTPException(status_code=400, detail="Request requires either audio or text query")
    
    if rec_request.audio and rec_request.text:
        raise HTTPException(status_code=400, detail="Request cannot have both audio and text queries")

    # TODO: add machine learning stuff here

    return {"recommendation": "greek food"}