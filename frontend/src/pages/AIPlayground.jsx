import { useState } from "react";
import api from "../services/api";
import ResultCard from "../components/ResultCard";


export default function AIPlayground() {

    const [text, setText] = useState("");

    const [result, setResult] = useState(null);

    const [loading, setLoading] = useState(false);



    const executeCommand = async () => {


        try {

            setLoading(true);
            setResult(null);


            const response = await api.post(
                `/ai?text=${encodeURIComponent(text)}`
            );


            setResult(response.data);


        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };



    return (

        <div>


            <h1>
                🤖 AI Playground
            </h1>



            <p>
                Describe what you want to do:
            </p>



            <input

                type="text"

                value={text}

                onChange={(e) => setText(e.target.value)}

                placeholder="Create customer Alex alex@gmail.com"

                style={{
                    width: "500px",
                    padding: "10px"
                }}

            />



            <br />
            <br />



            <button
                onClick={executeCommand}
                disabled={loading}
            >

                {loading ? "Executing..." : "Execute"}

            </button>



            <ResultCard result={result} />


        </div>

    );

}