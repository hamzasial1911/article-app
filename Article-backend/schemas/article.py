from pydantic import BaseModel
from typing import Optional, Any

class UpdateArticleModel(BaseModel):
    title: Optional[str]
    content: Optional[str]

    class Config:
        json_schema_extra = {
            "example": {
                "title": "Updated Article Title",
                "content": "Updated content of the article.",
            }
        }

class Response(BaseModel):
    status_code: int
    response_type: str
    description: str
    data: Optional[Any]

    class Config:
        json_schema_extra = {
            "example": {
                "status_code": 200,
                "response_type": "success",
                "description": "Operation successful",
                "data": "Sample data",
            }
        }
