from pydantic import BaseModel, AnyUrl
from typing import Optional
from fastapi import File

class RecommendationText(BaseModel):
    text: str

class Recipe(BaseModel):
    title: str
    image_urls: list[AnyUrl]
    description: str