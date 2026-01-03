from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()

router = APIRouter(prefix="/api/lawbot", tags=["LawBot"])

api_key = os.getenv("OPENROUTER_API_KEY")
print("🔑 Loaded API key:", api_key[:10] + "..." if api_key else "❌ Not found")

client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=api_key
)

# 🟣 Schema for incoming chat messages
class Query(BaseModel):
    question: str


# 🧠 POST: dynamic Q&A (no storage)
@router.post("/ask")
def ask_lawbot(query: Query):
    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a calm, accurate, and empathetic legal assistant specializing in Indian women's rights."},
                {"role": "user", "content": query.question}
            ],
            max_tokens=250
        )
        answer = response.choices[0].message.content.strip()
        print("💬 LawBot:", answer)
        return {"response": answer}

    except Exception as e:
        print("❌ Error:", e)
        raise HTTPException(status_code=500, detail=str(e))
