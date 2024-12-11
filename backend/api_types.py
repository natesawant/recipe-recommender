from pydantic import BaseModel, AnyUrl

class RecommendationText(BaseModel):
    text: str

class Recipe(BaseModel):
    title: str
    image_urls: list[AnyUrl]
    description: str