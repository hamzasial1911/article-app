# schemas/response.py
from pydantic import BaseModel
from typing import Optional, Any

class Response(BaseModel):
    status_code: int
    response_type: str
    description: str
    data: Optional[Any] = None


# Define a request schema for summarizing multiple articles
class SummarizeRequest(BaseModel):
    article_ids: list[str]  # List of article IDs