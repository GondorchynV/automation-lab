from app.models.models import Customer, Order


def create_customer(data: dict, db):
    customer = Customer(
        name=data.get("name"),
        email=data.get("email")
    )
    db.add(customer)
    db.commit()
    db.refresh(customer)
    return customer


def create_order(data: dict, db):
    order = Order(
        item=data.get("item"),
        price=data.get("price", 0),
        customer_id=data.get("customer_id")
    )
    db.add(order)
    db.commit()
    db.refresh(order)
    return order


ACTION_MAP = {
    "create_customer": create_customer,
    "create_order": create_order,
}


def dispatch(action: str, data: dict, db):
    try:
        if action not in ACTION_MAP:
            return {"error": "Unknown action"}

        return ACTION_MAP[action](data, db)

    except Exception as e:
        return {
            "error": "Execution failed",
            "details": str(e)
        }