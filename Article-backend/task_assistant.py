# task_assistant.py
import openai
from typing import Dict

# Global variable for OpenAI model
OPENAI_MODEL = "gpt-3.5-turbo-0125"  # or "gpt-4" if you have access

def setup_task_assistant(api_key: str, model: str):
    openai.api_key = api_key
    global OPENAI_MODEL
    OPENAI_MODEL = model

def generate_summary(article_content: str) -> str:
    prompt = f"Summarize the following article:\n\n{article_content}"
    try:
        response = openai.ChatCompletion.create(
            model=OPENAI_MODEL,
            messages=[
                {"role": "user", "content": prompt}
            ]
        )
        summary = response.choices[0].message['content']
        return summary.strip()
    except Exception as e:
        raise RuntimeError(f"Error generating summary: {e}")
