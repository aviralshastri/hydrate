import React, { useState } from "react";
import axios from "axios";

export default function App() {
  const [token, setToken] = useState("");

  const handleButtonClick = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:9000/get_jwt_token");
      setToken(response.data.token);
      console.log(response.data)
    } catch (error) {
      console.error("Error generating token:", error);
    }
  };

  return (
    <div>
      <button onClick={handleButtonClick} className="px-10 py-2 bg-black text-white rounded-xl my-10 mx-20">Generate Token</button>
      {token && <h1 className="px-10 py-2 bg-black text-white rounded-xl my-10 mx-20">{token}</h1>}
    </div>
  );
}
