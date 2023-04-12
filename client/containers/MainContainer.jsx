import React from 'react';
import NavBar from '../components/MainPage/NavBar';
import VisualContainer from './VisualContainer';
// import { useLoaderData } from 'react-router-dom'; // this will allow us to grab the data fetched by our loader



export default function MainContainer() {


    return (
        <>
        <NavBar/>
        <div className='mainContainer'>
            <VisualContainer/>
        </div>
        </>
    );
}
 
// Loader for MainContainer// 
//This is placed within the component and will run before rendering the component

export const userLoader = async () => {
    const res = await fetch('http://localhost:3000/user');
    return res;
}; 