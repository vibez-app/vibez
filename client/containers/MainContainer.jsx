import React from 'react';
import NavBar from '../components/MainPage/NavBar';
import Visualizer from '../components/MainPage/Visualizer';


function MainContainer() {
    return (
        <div className='mainContainer'>
            <NavBar/>
            <Visualizer/>
        </div>
    );
}
 
export default MainContainer;