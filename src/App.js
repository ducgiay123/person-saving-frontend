import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import LoginPage from "./components/LoginPage";
import "antd/dist/antd.css";
function App() {
  const [data, setData] = useState([]);

  const getAPIasd = () => {
    axios
      .get("http://localhost:8080/api/v1/person")
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((err) => console.log(err));
  };
  const listItems = data.map((item) => (
    <ul>
      <li>{item.name}</li>
      <li>{item.location}</li>
      <li>{item.money}</li>
    </ul>
  ));
  return (
    <div className="App">
      <LoginPage />
    </div>
  );
}

export default App;
