# # routes/article_summary.py
from fastapi import APIRouter, HTTPException
from config.config import Settings
from database.database import retrieve_article
from openai import OpenAI
from schemas.response import Response, SummarizeRequest

router = APIRouter()


SUMMARY_INSTRUCTIONS = "Summarize the following article content."

@router.get("/articles/{id}/summarize", response_model=Response)
async def summarize_article(id: str):
    article = await retrieve_article(id)
    if not article:
        return {
            "status_code": 404,
            "response_type": "error",
            "description": "Article doesn't exist",
            "data": None
        }
    openai_client = OpenAI(api_key=Settings().OPENAI_API_KEY)
    # openai_client = await initialize_openai_client()
    print("OpenAI client initialized")
    response = openai_client.chat.completions.create(
        model="gpt-4o-2024-08-06",
        messages=[
            {"role": "system", "content": SUMMARY_INSTRUCTIONS},
            {"role": "user", "content": article.content},
        ],
    )
    # Extract the summary from the response
    summary = response.choices[0].message.content.strip()

    try:
        return {
            "status_code": 200,
            "response_type": "success",
            "description": "Article summary generated successfully",
            "data": {
                "id": id,
                "title": article.title,
                "summary": summary,
            },
        }
    except Exception as e:
        return {
            "status_code": 500,
            "response_type": "error",
            "description": f"Error generating summary: {str(e)}",
            "data": None
        }




@router.post("/articles/summarize", response_model=Response)
async def summarize_articles(request: SummarizeRequest):
    summaries = []

    for article_id in request.article_ids:
        article = await retrieve_article(article_id)

        if not article:
            raise HTTPException(status_code=404, detail=f"Article with ID {article_id} doesn't exist")
        openai_client = OpenAI(api_key=Settings().OPENAI_API_KEY)
        response = openai_client.chat.completions.create(
            model="gpt-4o-2024-08-06",
            messages=[
                {"role": "system", "content": SUMMARY_INSTRUCTIONS},
                {"role": "user", "content": article.content},
            ],
        )

        summary = response.choices[0].message.content.strip()
        summaries.append({
            "id": article_id,
            "title": article.title,
            "summary": summary,
        })

    return {
        "status_code": 200,
        "response_type": "success",
        "description": "Article summaries generated successfully",
        "data": summaries,
    }