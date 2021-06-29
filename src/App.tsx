import React, { useState } from "react";
import { useEffect } from "react";
import "./App.css";

const API_ENDPOINT = "https://randomuser.me/api/?results=20";

const App: React.FC = () => {

  const [data, setData] = useState();

  const callApi: () => Promise<void> = async () => {
    const resp = await fetch(API_ENDPOINT);
    const apiData = await resp.json();
    console.log(apiData);
    setData(apiData);
  }

  useEffect(() => {callApi()}, []);

	return (
		<div>
      Hello world!
		</div>
	);
};

export default App;
