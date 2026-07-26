import { useEffect, useState } from "react";
import api from "../services/api";

export default function Orders() {

    const [orders, setOrders] = useState([]);

    const [item, setItem] = useState("");
    const [price, setPrice] = useState("");
    const [customerId, setCustomerId] = useState("");


    const loadOrders = async () => {

        try {

            const response = await api.get("/orders");

            setOrders(response.data);

        } catch (error) {

            console.log(error);

        }

    };


    useEffect(() => {

        loadOrders();

    }, []);



    const createOrder = async () => {

        try {

            await api.post("/orders", {

                item: item,
                price: Number(price),
                customer_id: Number(customerId)

            });


            setItem("");
            setPrice("");
            setCustomerId("");

            loadOrders();


        } catch (error) {

            console.log(error);

        }

    };



    return (

        <div>

            <h1>Orders</h1>


            <h2>Create Order</h2>


            <input
                type="text"
                placeholder="Item"
                value={item}
                onChange={(e) => setItem(e.target.value)}
            />


            <br />


            <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />


            <br />


            <input
                type="number"
                placeholder="Customer ID"
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
            />


            <br />


            <button onClick={createOrder}>
                Create
            </button>



            <hr />



            <h2>Order List</h2>


            <button onClick={loadOrders}>
                Refresh
            </button>



            <table
                border="1"
                cellPadding="10"
                style={{ marginTop: "20px" }}
            >

                <thead>

                    <tr>
                        <th>ID</th>
                        <th>Item</th>
                        <th>Price</th>
                        <th>Customer ID</th>
                    </tr>

                </thead>


                <tbody>

                    {orders.map(order => (

                        <tr key={order.id}>

                            <td>
                                {order.id}
                            </td>

                            <td>
                                {order.item}
                            </td>

                            <td>
                                {order.price}
                            </td>

                            <td>
                                {order.customer_id}
                            </td>

                        </tr>

                    ))}

                </tbody>


            </table>


        </div>

    );

}