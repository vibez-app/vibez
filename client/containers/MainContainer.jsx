import React from 'react';
import { useLoaderData, redirect } from 'react-router-dom';
import cookieParser from 'js-cookie';
import NavBar from '../components/MainPage/NavBar';
import VisualContainer from './VisualContainer';

export default function MainContainer() {
	// const user = useLoaderData();

	return (
		<>
			<NavBar />
			<br />
			{/* <div>{user.user.name}</div> */}
			<div className="mainContainer">
				<VisualContainer />
			</div>
		</>
	);
}

// Loader for MainContainer//
//This is placed within the component and will run before rendering the component

export const userLoader = async () => {
	const cookie = cookieParser.get('vibez'); //insert npm package method that reads our cookie here;
	if (!cookie) {
		return redirect('/');
	}
	const res = await fetch('/api/user');
	const user = await res.json();
	return user;
};
