from pydantic import BaseModel


class OrderCreate(BaseModel):
    item: str
    price: int
    customer_id: int


class OrderResponse(BaseModel):
    id: int
    item: str
    price: int
    customer_id: int

    class Config:
        from_attributes = True