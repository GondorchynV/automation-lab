import { useEffect, useState } from "react";
import api from "../services/api";


export default function Dashboard() {

    const [stats, setStats] = useState(null);


    const loadStats = async () => {

        try {

            const response = await api.get("/dashboard/stats");

            setStats(response.data);

        } catch (error) {

            console.log(error);

        }

    };


    useEffect(() => {

        loadStats();

    }, []);



    if (!stats) {

        return (
            <h1>
                Loading dashboard...
            </h1>
        );

    }



    return (

        <div>

            <h1>
                🚀 Automation Lab Dashboard
            </h1>


            <div
                style={{
                    display: "flex",
                    gap: "20px",
                    flexWrap: "wrap",
                    marginTop: "30px"
                }}
            >


                <div className="card">

                    <h2>
                        👥 Customers
                    </h2>

                    <h1>
                        {stats.customers}
                    </h1>

                </div>



                <div className="card">

                    <h2>
                        📦 Orders
                    </h2>

                    <h1>
                        {stats.orders}
                    </h1>

                </div>



                <div className="card">

                    <h2>
                        🤖 AI Tasks
                    </h2>

                    <h1>
                        {stats.automations}
                    </h1>

                </div>



                <div className="card">

                    <h2>
                        ✅ Success Rate
                    </h2>

                    <h1>
                        {stats.success_rate}%
                    </h1>

                </div>


            </div>


        </div>

    );

}