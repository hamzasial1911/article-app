# routes/article_embedding.py
from fastapi import APIRouter, HTTPException
from pinecone_init import initialize_pinecone
from config.config import Settings
from database.database import retrieve_article
from schemas.response import Response, SummarizeRequest
import openai
import pinecone

router = APIRouter()
settings = Settings()

# Initialize Pinecone index
index = initialize_pinecone()

@router.post("/articles/{id}/embed", response_model=Response)
async def embed_article(id: str):
    # Fetch the article from the database
    article = await retrieve_article(id)
    if not article:
        return {
            "status_code": 404,
            "response_type": "error",
            "description": "Article doesn't exist",
            "data": None
        }

    # Generate embeddings with OpenAI
    openai.api_key = settings.OPENAI_API_KEY
    try:
        response = openai.embeddings.create(
            input=article.content,
            model="text-embedding-3-small"  # Adjust model if needed
        )
        # Extract the embedding vector from the response
        embedding = response.data[0].embedding  # Access `data` correctly

        
        # Store embeddings in Pinecone
        index.upsert([(id, embedding )])
        print("done")
        return {
            "status_code": 200,
            "response_type": "success",
            "description": "Article embedding stored successfully",
            "data": {"id": id, "title": article.title},
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating embedding: {str(e)}")


@router.post("/articles/embed_batch", response_model=Response)
async def embed_articles_batch(request: SummarizeRequest):
    success_count = 0
    errors = []
    openai.api_key = settings.OPENAI_API_KEY
    for id in request.article_ids:
        article = await retrieve_article(id)
        if not article:
            errors.append({"id": id, "error": "Article not found"})
            continue

        try:
            response = openai.embeddings.create(
                input=article.content,
                model="text-embedding-ada-002"
            )
            embedding = response.data[0].embedding
            index.upsert([(id, embedding)])
            success_count += 1
        except Exception as e:
            errors.append({"id": id, "error": str(e)})

    return {
        "status_code": 200,
        "response_type": "success",
        "description": f"Embeddings generated for {success_count} articles",
        "data": {"success_count": success_count, "errors": errors},
    }


@router.get("/articles/search", response_model=Response)
async def search_articles(query: str):
    # Generate embedding for the query
    openai.api_key = settings.OPENAI_API_KEY
    try:
        response = openai.embeddings.create(
            input=query,
            model="text-embedding-3-small"  # Adjust model if needed
        )
        # Extract the embedding vector from the response
        query_embedding = response.data[0].embedding  # Access `data` correctly
        # Search in Pinecone
        search_results = index.query(
            vector=query_embedding,
            top_k=5,  # Number of similar articles to retrieve
            include_values=False,
            include_metadata=True
        )

        results = [{"id": match["id"], "score": match["score"]} for match in search_results["matches"]]

        return {
            "status_code": 200,
            "response_type": "success",
            "description": "Similar articles retrieved successfully",
            "data": results,
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error searching articles: {str(e)}")
