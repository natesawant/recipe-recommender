from pydantic import BaseModel, AnyUrl, Base64Bytes
from typing import Optional

class RecommendationRequest(BaseModel):
    text: Optional[str]
    audio: Optional[Base64Bytes]

class Recipe(BaseModel):
    title: str
    image_urls: list[AnyUrl]
    description: str