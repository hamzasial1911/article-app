from typing import Optional
from beanie import Document
from pydantic import BaseModel

class Article(Document):
    title: str
    content: str

    class Config:
        json_schema_extra = {
            "example": {
                "title": "Sample Article Title",
                "content": "This is the content of the article.",
            }
        }

    class Settings:
        name = "articles"  # Matches the MongoDB collection name
