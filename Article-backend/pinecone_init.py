# pinecone_init.py
import os
from pinecone import Pinecone, ServerlessSpec
from config.config import Settings
from datetime import time

settings = Settings()

def initialize_pinecone():
    pc = Pinecone(
        api_key=settings.PINECONE_API_KEY
    )
    
    index_name = "article-embeddings"
    
    # Create the index if it does not exist
    if index_name not in pc.list_indexes().names():
        pc.create_index(
            name=index_name,
            dimension=1536,  # Dimension for OpenAI embeddings
            metric="cosine",
            spec=ServerlessSpec(
                cloud="aws",
                region="us-east-1"
            )
        )
    # Wait for the index to be ready
    while not pc.describe_index(index_name).status['ready']:
        time.sleep(1)

    index = pc.Index(index_name)
    # Return the index instance
    return index
