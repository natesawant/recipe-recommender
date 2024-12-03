import torch
import pickle 
import pandas as pd 
from pathlib import Path
from transformers import BertTokenizer
from bert_model import BERTIngredientClassifier
from sklearn.preprocessing import MultiLabelBinarizer
from api_types import Recipe

class RecipeRecommender: 
    def __init__(self, recipes_csv = None):
        self.df = pd.read_csv(recipes_csv or Path("backend/data") / "recipe-ingredients-dataset.csv")
        self.tok = BertTokenizer.from_pretrained("bert-base-uncased", clean_up_tokenization_spaces=True)
        
        with open('backend/models/ingredient_model.pkl', 'rb') as f:
            self.model = pickle.load(f)
        with open('backend/binarizers/ingredient_mlb.pkl', 'rb') as f:
            self.mlb = pickle.load(f)

    def recommend(self, prompt: str) -> Recipe:
        self.model.eval()
        tokenized = self.tok(prompt, max_length=128, padding=True, truncation=True, return_tensors='pt')

        with torch.no_grad(): 
            pred = self.model(tokenized['input_ids'], tokenized['attention_mask'])
            pred_ingredients = self.mlb.inverse_transform(pred.sigmoid() > 0.55)
        return Recipe(name=prompt, description=pred_ingredients[0])