import React from 'react';
import './app.css';
// import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import axios from 'axios';

const api = axios.create({
	baseURL: 'http://localhost:3000/',
});

const handler = () => {
	api
		.get('/day', {
			params: {
				date: '2023-04-08',
			},
		})
		.then((res) => console.log(res.data));
};

function App() {
	return (
		<div>
			<h1>It is indeed a vibe</h1>

			<button type="button" onClick={handler} className="bg-gray-500">
				CLICK ME
			</button>
		</div>
	);
}

export default App;
