from typing import List
from dotenv import dotenv_values
from openai import OpenAI

from api_types import Recipe
from atlas_client import AtlasClient
from recommender import Recommender

config = dotenv_values(".env")

MONGO_URI = config["MONGO_URI"]
OPENAI_API_KEY = config["OPENAI_API_KEY"]
DB_NAME = "recipe-vectors"
COLLECTION_NAME = "embeddings"
INDEX_NAME = "embedding_vector_index"


class EmbeddingRecommender(Recommender):
    def __init__(self):
        self.atlas_client = AtlasClient(MONGO_URI, DB_NAME)
        self.atlas_client.ping()
        print("Connected to Atlas instance!")

        self.openai_client = OpenAI(api_key=OPENAI_API_KEY)
        print("Connected to OpenAI API!")

    def recommend(self, prompt: str) -> Recipe:
        prompt = prompt.lower().strip()

        embedding = self.get_embedding(prompt)

        recipes = self.atlas_client.vector_search(
            COLLECTION_NAME,
            INDEX_NAME,
            attr_name="embedding",
            embedding_vector=embedding,
            limit=5,
        )
        
        results = []

        for recipe in recipes:
            recipe = {
                "name": recipe["name"],
                "description": recipe["description"],
                "ingredients": recipe["ingredients_raw_str"],
                "directions": recipe["steps"],
            }

            results.append(recipe)
            
        print(results)
        
        return results

    def get_embedding(self, text: str, model="text-embedding-3-small"):
        return self.get_embeddings([text], model=model)[0]

    def get_embeddings(self, texts: List[str], model="text-embedding-3-small"):
        texts = [text.replace("\n", " ") for text in texts]
        embeddings = [
            d.embedding
            for d in self.openai_client.embeddings.create(input=texts, model=model).data
        ]
        return embeddings
