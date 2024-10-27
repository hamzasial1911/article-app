from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware  # Import CORSMiddleware
from config.config import initiate_database #, initialize_openai_client
from routes.article import router as ArticleRouter
from routes.article_summary import router as summary_router
from routes.article_embedding import router as embedding_router

app = FastAPI()

@app.on_event("startup")
async def start_database():
    await initiate_database()
    # await initialize_openai_client()
    


# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allow only the React frontend origin
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, PUT, DELETE)
    allow_headers=["*"],  # Allow all headers
)

@app.get("/", tags=["Root"])
async def read_root():
    return {"message": "Welcome to this fantastic app."}

app.include_router(ArticleRouter, tags=["Articles"], prefix="/articles")
app.include_router(summary_router, tags=["Summarize"])
app.include_router(embedding_router, prefix="/articles", tags=["Embedding"])