from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.orm import Session

from app.db.database import SessionLocal
from app.models.models import Order, Customer
from app.schemas.order import OrderCreate, OrderResponse

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/orders", response_model=OrderResponse, status_code=status.HTTP_201_CREATED)
def create_order(order: OrderCreate, db: Session = Depends(get_db)):
    customer = db.query(Customer).filter(Customer.id == order.customer_id).first()

    if not customer:
        raise HTTPException(status_code=404, detail="Customer not found")

    db_order = Order(
        item=order.item,
        price=order.price,
        customer_id=order.customer_id
    )

    db.add(db_order)
    db.commit()
    db.refresh(db_order)
    return db_order


@router.get("/orders", response_model=list[OrderResponse])
def get_orders(db: Session = Depends(get_db)):
    return db.query(Order).all()


@router.get("/orders/customer/{customer_id}", response_model=list[OrderResponse])
def get_orders_by_customer(customer_id: int, db: Session = Depends(get_db)):
    return db.query(Order).filter(Order.customer_id == customer_id).all()