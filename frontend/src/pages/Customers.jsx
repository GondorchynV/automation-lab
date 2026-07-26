import { useEffect, useState } from "react";
import api from "../services/api";

export default function Customers() {

    const [customers, setCustomers] = useState([]);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");


    const loadCustomers = async () => {

        try {

            const response = await api.get("/customers");

            setCustomers(response.data);

        } catch (error) {

            console.log(error);

        }
    };


    useEffect(() => {
        loadCustomers();
    }, []);



    const createCustomer = async () => {

        try {

            await api.post("/customers", {
                name: name,
                email: email
            });


            setName("");
            setEmail("");

            loadCustomers();


        } catch (error) {

            console.log(error);

        }

    };



    return (

        <div>

            <h1>Customers</h1>


            <h2>Create Customer</h2>


            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />


            <br />


            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />


            <br />


            <button onClick={createCustomer}>
                Create
            </button>



            <hr />



            <h2>Customer List</h2>


            <button onClick={loadCustomers}>
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
                        <th>Name</th>
                        <th>Email</th>
                    </tr>

                </thead>


                <tbody>

                    {customers.map(customer => (

                        <tr key={customer.id}>

                            <td>
                                {customer.id}
                            </td>

                            <td>
                                {customer.name}
                            </td>

                            <td>
                                {customer.email}
                            </td>

                        </tr>

                    ))}

                </tbody>


            </table>


        </div>

    );
}