import React from 'react';
import NavBar from '../components/MainPage/NavBar';
import VisualContainer from './VisualContainer';


function MainContainer() {
    return (
        <>
        <NavBar/>
        <div className='mainContainer'>
            <VisualContainer/>
        </div>
        </>
    );
}
 
export default MainContainer;