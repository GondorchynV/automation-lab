export default function ResultCard({ result }) {

    if (!result) {
        return null;
    }


    return (

        <div
            style={{
                marginTop: "30px",
                padding: "20px",
                border: "1px solid #ddd",
                borderRadius: "10px",
                width: "400px"
            }}
        >

            <h2>
                ✅ Success
            </h2>


            {result.id && (

                <div>

                    <p>
                        <b>ID:</b> {result.id}
                    </p>

                </div>

            )}



            {result.name && (

                <p>
                    <b>Name:</b> {result.name}
                </p>

            )}



            {result.email && (

                <p>
                    <b>Email:</b> {result.email}
                </p>

            )}



            {result.item && (

                <p>
                    <b>Item:</b> {result.item}
                </p>

            )}



            {result.price && (

                <p>
                    <b>Price:</b> {result.price}
                </p>

            )}



            {result.customer_id && (

                <p>
                    <b>Customer ID:</b> {result.customer_id}
                </p>

            )}


        </div>

    );
}