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

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/">
			<Route index element={<Login />} loader={userLoggedIn} />
			<Route path="/home" element={<MainContainer />} loader={userLoader} />
		</Route>
	)
);

export default function App() {
	return <RouterProvider router={router} />;
}
