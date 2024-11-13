from api_types import Recipe


class Recommender:
    def __init__(self):
        raise NotImplementedError()

    def recommend(self, prompt: str) -> Recipe:
        """
        Returns the most relevant recipe given the prompt
        """
        raise NotImplementedError()
    