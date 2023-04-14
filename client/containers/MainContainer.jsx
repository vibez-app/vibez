import React from 'react';
import { useState } from 'react';
import { useLoaderData, redirect } from 'react-router-dom';
import cookieParser from 'js-cookie';
import NavBar from '../components/MainPage/NavBar';
import VisualContainer from './VisualContainer';
// import fakeDB from '../fakeDB';

export default function MainContainer() {
	// const user = useLoaderData();
	// const date = '2023-04-08';
	// const [userData, updateUserData] = useState({
	// 	User: user.name,
	// 	Day: user.days[date],
	// 	Colors: user.days[date].colors
	// });

	return (
		<>
			<NavBar />
			{/* <div>{userData.name}</div>
			<div>{userData.Colors}</div> */}
			<div className="mainContainer" >
				<VisualContainer/>
			</div>
		</>
	);
}

// Loader for MainContainer//
// This is placed within the component and will run before rendering the component

// export const userLoader = async () => {
// 	const cookie = cookieParser.get('vibez'); // insert npm package method that reads our cookie here;
// 	if (!cookie) {
// 		return redirect('/');
// 	}
// 	// const res = await fetch('/api/user');
// 	// const user = fakeDB;
// 	// const user = await res.json();
// 	console.log(user)
// 	return user;
// };
