import React from 'react';
import './app.css';
<<<<<<< HEAD
import {Routes, Route, useNavigate} from "react-router-dom";
import MainContainer from "./containers/MainContainer";
import Login from "./components/LoginPage/Login";
import VibeLogInput from "./components/MainPage/VibeLogInput";
import NavBar from "./components/MainPage/NavBar";


function App() {
    return (
        
            <Routes>
                <Route path='/login' element={<Login/>} />
                <Route path='/home' element={<MainContainer/>} />
                <Route path='/log' element={<VibeLogInput/>} />
            </Routes>
     
    )
=======
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
>>>>>>> 153548843dcc7a6ea079485d9779233db2b29c4b
}

export default App;
