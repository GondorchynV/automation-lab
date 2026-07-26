import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Orders from "./pages/Orders";
import AIPlayground from "./pages/AIPlayground";
import History from "./pages/History";


function App() {

    return (

        <BrowserRouter>

            <Routes>

                <Route element={<MainLayout />}>

                    <Route 
                        path="/" 
                        element={<Dashboard />}
                    />

                    <Route
                        path="/customers"
                        element={<Customers />}
                    />

                    <Route
                        path="/orders"
                        element={<Orders />}
                    />

                    <Route
                        path="/ai"
                        element={<AIPlayground />}
                    />

                    <Route 
                        path="/history" 
                        element={<History />} 
                    />

                </Route>

            </Routes>

        </BrowserRouter>

    );
}


export default App;