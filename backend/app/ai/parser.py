from dotenv import load_dotenv
from openai import OpenAI
import json

load_dotenv()

client = OpenAI()


def parse_command(text: str):
    response = client.chat.completions.create(
        model="gpt-4.1-mini",
        response_format={"type": "json_object"},
        messages=[
            {
                "role": "system",
                "content": """
You are an AI backend router.

Return ONLY valid JSON.

Rules:
- Always return:
{
  "action": "create_customer | create_order",
  "data": {
    "item": "",
    "price": 0,
    "customer_id": 0,
    "name": "",
    "email": ""
  }
}

Mapping rules:
- If user talks about customer → use name + email
- If user talks about order → use item + price + customer_id

NEVER use product, NEVER use other field names.
"""
            },
            {"role": "user", "content": text}
        ]
    )

    return json.loads(response.choices[0].message.content)