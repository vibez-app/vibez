import React from "react";
import './app.css';
import MainContainer from "./containers/MainContainer";
// import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

function App() {
    return (
        <div className="bg-teal container max-w-full min-h-screen">
            <MainContainer/>
        </div>
    )
}

export default App