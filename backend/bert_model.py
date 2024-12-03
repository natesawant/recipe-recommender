import torch
from transformers import BertModel

import torch.nn as nn

class BERTIngredientClassifier(nn.Module):
    def __init__(self, num_labels):
        super(BERTIngredientClassifier, self).__init__()
        self.bert = BertModel.from_pretrained("bert-base-uncased")
        self.classifier = nn.Linear(self.bert.config.hidden_size, num_labels)
        self.sigmoid = nn.Sigmoid()
    
    def forward(self, input_ids, attention_mask):
        outputs = self.bert(input_ids=input_ids, attention_mask=attention_mask)
        cls_output = outputs.pooler_output
        logits = self.classifier(cls_output)
        return self.sigmoid(logits) 