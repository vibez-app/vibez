import React from 'react';

import {
	createBrowserRouter,
	RouterProvider,
	Route,
	createRoutesFromElements,
} from 'react-router-dom';

// COMPONENTS
import MainContainer from './containers/MainContainer';
import Login from './components/LoginPage/Login';

// LAYOUTS (This will allow us to add a NavBar to a subset of pages)
import RootLayout from './layouts/RootLayout';

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/">
			<Route index element={<Login />}/>
			<Route path="/home" element={<MainContainer />} />
		</Route>
	)
);

export default function App() {
	return <RouterProvider router={router} />;
}
