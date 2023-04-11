import React from "react";
import './app.css';
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
}

export default App