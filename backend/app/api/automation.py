from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.database import SessionLocal
from app.models.models import AutomationLog
from app.schemas.automation import AutomationLogResponse


router = APIRouter()



def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()



@router.get(
    "/automation/history",
    response_model=list[AutomationLogResponse]
)
def get_history(
    db: Session = Depends(get_db)
):

    return db.query(
        AutomationLog
    ).order_by(
        AutomationLog.id.desc()
    ).all()