import React from "react";

import { 
     createBrowserRouter,
     RouterProvider,
     Route, 
     createRoutesFromElements
} from "react-router-dom";

//COMPONENTS
import MainContainer, {userLoader } from "./containers/MainContainer";
import Login from "./components/LoginPage/Login";




const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/">
            <Route index element={<Login/>}/>
            <Route path='/home' element={<MainContainer/>} loader={userLoader}/>            
        </Route>
    )

    // {
    //     path:'/',
    //     element: <Login path/>,
    //     loader: ""// this loader checks to see if we have a 'vibez' cookie and redirects to /home if we do
    // },
    // { 
    //     path: '/home',
    //     element: <MainContainer/>,
    //     // loader: "", // makes the request to /user on the backend and gets user data
    //     // children: [
    //     //     {
    //     //         path: '/home/log',
    //     //         element: <VibeLogInput/>,
    //     //         // loader: "",
    //     //     }
    //     // ]
    // }


)

export default function App() {
    return(
        <RouterProvider router = {router}/>
    );
}