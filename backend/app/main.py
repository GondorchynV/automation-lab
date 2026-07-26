from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from app.db.database import engine, SessionLocal
from app.models.models import Base, AutomationLog
from app.ai.parser import parse_command
from app.core.dispatcher import dispatch
from app.api.automation import router as automation_router
from app.api.customers import router as customers_router
from app.api.orders import router as orders_router
from app.schemas.customer import CustomerResponse
from app.api.dashboard import router as dashboard_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(customers_router)
app.include_router(orders_router)
app.include_router(automation_router)
app.include_router(dashboard_router)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post("/ai")
def ai(text: str, db: Session = Depends(get_db)):

    parsed = parse_command(text)


    result = dispatch(
        parsed["action"],
        parsed.get("data", {}),
        db
    )


    log = AutomationLog(
        command=text,
        action=parsed["action"],
        status="SUCCESS",
        result=str(CustomerResponse.model_validate(result).model_dump())
    )


    db.add(log)
    db.commit()


    return result


@app.get("/")
def root():
    return {"status": "ok"}
