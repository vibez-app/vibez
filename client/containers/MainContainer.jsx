import React from 'react';
import NavBar from '../components/MainPage/NavBar';
import Visualizer from '../components/MainPage/Visualizer';
import Login from '../components/LoginPage/Login';


function MainContainer() {
    return (
        <div className='mainContainer'>
            <Login/>
            <NavBar/>
            <Visualizer/>

        </div>
    );
}
 
export default MainContainer;