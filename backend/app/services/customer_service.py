from sqlalchemy.orm import Session
from app.models.models import Customer


class CustomerService:

    @staticmethod
    def create_customer(db: Session, name: str, email: str):
        customer = Customer(
            name=name,
            email=email
        )

        db.add(customer)
        db.commit()
        db.refresh(customer)

        return customer

    @staticmethod
    def get_all_customers(db: Session):
        return db.query(Customer).all()

    @staticmethod
    def get_customer_by_id(db: Session, customer_id: int):
        return db.query(Customer).filter(Customer.id == customer_id).first()