from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from datetime import datetime
from sqlalchemy.orm import relationship, declarative_base

Base = declarative_base()

class Customer(Base):
    __tablename__ = "customers"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String, unique=True)

    orders = relationship("Order", back_populates="customer")


class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    item = Column(String)
    price = Column(Integer)

    customer_id = Column(Integer, ForeignKey("customers.id"))

    customer = relationship("Customer", back_populates="orders")

class AutomationLog(Base):

    __tablename__ = "automation_logs"


    id = Column(
        Integer,
        primary_key=True,
        index=True
    )


    command = Column(
        String,
        nullable=False
    )


    action = Column(
        String,
        nullable=False
    )


    status = Column(
        String,
        nullable=False
    )


    result = Column(
        String,
        nullable=True
    )


    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )