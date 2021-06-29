import React, { useState } from "react";
import { useEffect } from "react";
import "./App.css";

const API_ENDPOINT = "https://randomuser.me/api/?results=20";

const App: React.FC = () => {

  const [data, setData] = useState();

  const callApi: () => Promise<void> = async () => {
    const resp = await fetch(API_ENDPOINT);
    const apiData = await resp.json();
    setData(apiData);
  }

  useEffect(() => {callApi()}, []);

	return (
		<div>
			<button onClick={() => {callApi()}}>Refresh</button>
			<pre>{JSON.stringify(data, null, 2)}</pre>
		</div>
	);
};

export default App;
