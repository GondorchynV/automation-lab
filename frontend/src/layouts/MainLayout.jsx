import { Link, Outlet } from "react-router-dom";

export default function MainLayout() {
    return (
        <div style={{ display: "flex", minHeight: "100vh" }}>

            <aside
                style={{
                    width: "220px",
                    padding: "20px",
                    borderRight: "1px solid #ddd"
                }}
            >

                <h2>Automation Lab</h2>

                <nav>

                    <p>
                        <Link to="/">Dashboard</Link>
                    </p>

                    <p>
                        <Link to="/customers">
                            Customers
                        </Link>
                    </p>

                    <p>
                        <Link to="/orders">
                            Orders
                        </Link>
                    </p>

                    <p>
                        <Link to="/ai">
                            AI Playground
                        </Link>
                    </p>

                    <p>
                        <Link to="/history">
                            📜 History
                        </Link>
                    </p>

                </nav>

            </aside>


            <main style={{ padding: "30px", flex: 1 }}>
                <Outlet />
            </main>

        </div>
    );
}