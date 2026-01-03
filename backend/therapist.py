from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()

router = APIRouter(prefix="/api/therapist", tags=["Therapist"])

client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=os.getenv("OPENROUTER_API_KEY")
)

class TherapistQuery(BaseModel):
    message: str

@router.post("/chat")
def therapist_chat(query: TherapistQuery):
    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {
                    "role": "system",
                    "content": (
                        "You are a calm, empathetic AI therapist designed to emotionally support women. "
                        "You listen carefully, validate feelings, respond gently, and encourage healthy coping. "
                        "You do NOT give medical diagnoses."
                    )
                },
                {"role": "user", "content": query.message}
            ],
            max_tokens=300
        )

        reply = response.choices[0].message.content.strip()
        return {"reply": reply}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
