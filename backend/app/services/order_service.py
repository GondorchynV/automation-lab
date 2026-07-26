from app.models.models import Order


def create_order_service(item: str, price: int, customer_id: int, db):
    order = Order(
        item=item,
        price=price,
        customer_id=customer_id
    )

    db.add(order)
    db.commit()
    db.refresh(order)

    return order