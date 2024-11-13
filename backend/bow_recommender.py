import ast
import pickle
from pathlib import Path

import numpy as np
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity

from api_types import Recipe
from recommender import Recommender


class BoWRecommender(Recommender):
    def __init__(self, recipes_csv = None):
        self.df = pd.read_csv(recipes_csv or Path("data") / "vectorized_recipes.csv")

        with open('vectorizers/recipe_vectorizer.pkl', 'rb') as f:
            self.tfidf = pickle.load(f)
        with open('models/recipe_svd.pkl', 'rb') as f:
            self.svd = pickle.load(f)
        with open('models/recipe_vectors.pkl', 'rb') as f:
            self.reduced_data = pickle.load(f)

    def recommend(self, prompt: str) -> Recipe:
        target_vector = self.tfidf.transform([prompt])
        reduced_target_vector = self.svd.transform(target_vector)

        similarities = cosine_similarity(reduced_target_vector, self.reduced_data).flatten()
        topk = np.argpartition(similarities, -5)[-5:]

        results = []

        for idx in topk:
            row = self.df.iloc[idx]
            
            recipe = {
                "name": row["name"],
                "description": row["description"],
                "ingredients": ast.literal_eval(row["ingredients_raw_str"]),
                "directions": ast.literal_eval(row["steps"]),
            }

            results.append(recipe)
        
        return results