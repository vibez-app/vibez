import React from 'react';

import {
	createBrowserRouter,
	RouterProvider,
	Route,
	createRoutesFromElements,
} from 'react-router-dom';

// COMPONENTS
import MainContainer, { userLoader } from './containers/MainContainer';
import Login, { userLoggedIn } from './components/LoginPage/Login';

// LAYOUTS (This will allow us to add a NavBar to a subset of pages)
import RootLayout from './layouts/RootLayout';
import LogVibeContainer from './containers/LogVibeContainer';

// test date 
const date = "2023-04-08"
const route = "/2023-04-08"

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/">
			{/* index? */}
			<Route index element={<Login />} loader={userLoggedIn} /> 
			<Route path="/home" element={<MainContainer />} loader={userLoader} />
			<Route path="/2023-04-08" element={<LogVibeContainer />} loader={userLoader} />
		</Route>
	)
);

export default function App() {
	return <RouterProvider router={router} />;
}
