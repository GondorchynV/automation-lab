from pydantic import BaseModel
from datetime import datetime


class AutomationLogResponse(BaseModel):

    id: int
    command: str
    action: str
    status: str
    result: str | None
    created_at: datetime


    class Config:
        from_attributes = True