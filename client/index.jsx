import React from 'react'
import './app.css'
import  { createRoot }  from 'react-dom/client';
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import * as loaders from './loaders'
import MainContainer from "./containers/MainContainer";
import Login from "./components/LoginPage/Login";
import VibeLogInput from "./components/MainPage/VibeLogInput";

const container = document.getElementById('root');
const root = createRoot(container);

const router = createBrowserRouter([
    {
        path:'/',
        element: <Login/>,
        loader: ""// this loader checks to see if we have a 'vibez' cookie and redirects to /home if we do
    },
    { 
        path: '/home',
        element: <MainContainer/>,
        // loader: "", // makes the request to /user on the backend and gets user data
        // children: [
        //     {
        //         path: '/home/log',
        //         element: <VibeLogInput/>,
        //         // loader: "",
        //     }
        // ]
    }


])


root.render(
    <RouterProvider
        router = {router}
        fallbackElement = {<Login/>}
    />
);