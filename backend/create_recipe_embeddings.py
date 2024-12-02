import json
import ast

import pandas as pd

from embedding_recommender import EmbeddingRecommender


df_all = pd.read_csv("misc_data/recipe-ingredients-dataset.csv")

recommender = EmbeddingRecommender()

df_all = df_all.dropna()

for start_df in range(0, len(df_all), 2500):
    end_df = min(start_df + 2500, len(df_all))
    print(f"Creating embeddings from {start_df}-{end_df}")

    df = df_all[start_df:end_df]

    df["tags"] = df["tags"].apply(
        lambda x: json.loads(x.replace("'", '"').replace("{", "[").replace("}", "]"))
    )
    df["search_terms"] = df["search_terms"].apply(
        lambda x: json.loads(x.replace("'", '"').replace("{", "[").replace("}", "]"))
    )
    df["ingredients"] = df["ingredients"].apply(
        lambda x: json.loads(x.replace("'", '"'))
    )

    df["steps"] = df["steps"].apply(lambda x: ast.literal_eval(x))
    df["ingredients_raw_str"] = df["ingredients_raw_str"].apply(
        lambda x: ast.literal_eval(x)
    )

    df["tags_str"] = df["tags"].apply(lambda x: " ".join(x))
    df["search_terms_str"] = df["search_terms"].apply(lambda x: " ".join(x))
    df["ingredients_str"] = df["ingredients"].apply(lambda x: " ".join(x))

    df["all_tags"] = (
        df["description"]
        + " "
        + df["ingredients_str"]
        + " "
        + df["tags_str"]
        + " "
        + df["search_terms_str"]
        + " "
        + df["cuisine"]
    )
    recipe_tags = df["all_tags"].to_list()

    recommender.get_embedding("I want a sweet potato dish")

    embeddings = []
    for start in range(0, len(recipe_tags), 10):
        end = min(start + 10, len(recipe_tags))
        embeddings += recommender.get_embeddings(recipe_tags[start:end])

    df["embedding"] = embeddings

    rows = df.drop(
        columns=["Unnamed: 0", "tags_str", "search_terms_str", "ingredients_str"]
    ).to_dict("records")

    recommender.atlas_client.database["recipes"].insert_many(rows)
