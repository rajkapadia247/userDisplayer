import React, { useState } from "react";
import { useEffect } from "react";
import "./App.css";

const API_ENDPOINT = "https://randomuser.me/api/?results=20";

interface User {
	results: {
		name: {
			first: string;
			last: string;
			title: string;
		};
		email: string;
		login: {
			username: string;
			password: string;
		};
    picture: {
      thumbnail: string;
    }
	}[];
}

const App: React.FC = () => {
	const [data, setData] = useState<User>({ results: [] });

	const callApi: () => Promise<void> = async () => {
		const resp = await fetch(API_ENDPOINT);
		const apiData = await resp.json();
		console.log(apiData);
		setData(apiData);
	};

	useEffect(() => {
		callApi();
	}, []);

	const renderTableDetails: () => JSX.Element[] = () => {
		return data.results.map(
			({
				name: { first, last, title },
				email,
				login: { username, password },
				picture: {thumbnail}
			}) => {
				return (
					<tr key={username}>
            <td><img src={thumbnail} alt={`avatar_${username}`}/></td>
						<td>{`${title} ${first} ${last}`}</td>
						<td>{email}</td>
						<td>{username}</td>
						<td>{password}</td>
					</tr>
				);
			}
		);
	};

	return (
		<div className="app">
			<button
				onClick={() => {
					callApi();
				}}
			>
				Refresh
			</button>
			<div className="tableWrapper">
				<table>
					<thead>
						<tr>
              <th>Picture</th>
							<th>Name</th>
							<th>E-mail</th>
							<th>Username </th>
							<th>password </th>
						</tr>
					</thead>
					<tbody>{renderTableDetails()}</tbody>
				</table>
			</div>
		</div>
	);
};

export default App;
