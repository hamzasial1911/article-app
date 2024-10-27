from typing import Optional

from beanie import init_beanie
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic_settings import BaseSettings
import models as models
from openai import OpenAI

class Settings(BaseSettings):
    # database configurations
    DATABASE_URL: Optional[str] = None
    OPENAI_API_KEY: Optional[str] = None
    PINECONE_API_KEY: Optional[str] = None
    # PINECONE_ENVIRONMENT="us-east-1"  # Replace with the valid region you verified in Pinecone

    class Config:
        env_file = ".env.dev"
        from_attributes = True


async def initiate_database():
    client = AsyncIOMotorClient(Settings().DATABASE_URL)
    await init_beanie(
        database=client.get_default_database(), document_models=models.__all__
    )


# def initialize_openai_client():
#     global openai_client
#     if openai_client is None:
#         openai_client = OpenAI(api_key=Settings().OPENAI_API_KEY)
#         print("OpenAI client initialized")
#     return openai_client