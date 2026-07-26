from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.database import SessionLocal
from app.models.models import Customer, Order, AutomationLog


router = APIRouter()



def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()



@router.get("/dashboard/stats")
def get_dashboard_stats(
    db: Session = Depends(get_db)
):

    customers_count = db.query(Customer).count()

    orders_count = db.query(Order).count()

    automations_count = db.query(AutomationLog).count()


    successful_automations = db.query(
        AutomationLog
    ).filter(
        AutomationLog.status == "SUCCESS"
    ).count()


    if automations_count > 0:

        success_rate = round(
            (successful_automations / automations_count) * 100
        )

    else:

        success_rate = 0



    return {

        "customers": customers_count,

        "orders": orders_count,

        "automations": automations_count,

        "success_rate": success_rate

    }