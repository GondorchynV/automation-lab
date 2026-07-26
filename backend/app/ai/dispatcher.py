from app.services.customer_service import CustomerService
from app.services.order_service import OrderService


class Dispatcher:

    @staticmethod
    def execute(action: str, data: dict, db):
        
        if action == "create_customer":
            return CustomerService.create_customer(
                db=db,
                name=data.get("name"),
                email=data.get("email")
            )

        if action == "get_customers":
            return CustomerService.get_all_customers(db)

        if action == "create_order":
            return OrderService.create_order(
                db=db,
                item=data.get("item"),
                price=data.get("price", 0),
                customer_id=data.get("customer_id")
            )

        if action == "get_orders":
            return OrderService.get_all_orders(db)

        if action == "get_orders_by_customer":
            return OrderService.get_orders_by_customer(
                db=db,
                customer_id=data.get("customer_id")
            )

        return {
            "error": "Unknown action",
            "action": action
        }