import { useEffect, useState } from "react";
import api from "../services/api";


export default function History() {

    const [history, setHistory] = useState([]);


    const loadHistory = async () => {

        try {

            const response = await api.get("/automation/history");

            setHistory(response.data);

        } catch (error) {

            console.log(error);

        }

    };


    useEffect(() => {

        loadHistory();

    }, []);



    return (

        <div>

            <h1>
                📜 Automation History
            </h1>


            <button onClick={loadHistory}>
                Refresh
            </button>


            <table
                border="1"
                cellPadding="10"
                style={{
                    marginTop: "20px"
                }}
            >

                <thead>

                    <tr>

                        <th>ID</th>

                        <th>Command</th>

                        <th>Action</th>

                        <th>Status</th>

                        <th>Date</th>

                    </tr>

                </thead>


                <tbody>


                    {history.map((item) => (

                        <tr key={item.id}>

                            <td>
                                {item.id}
                            </td>


                            <td>
                                {item.command}
                            </td>


                            <td>
                                {item.action}
                            </td>


                            <td>
                                {item.status}
                            </td>


                            <td>
                                {new Date(item.created_at).toLocaleString()}
                            </td>


                        </tr>

                    ))}


                </tbody>


            </table>


        </div>

    );
}