import React, { useMemo } from 'react';
import { useLoaderData, redirect } from 'react-router-dom';
import cookieParser from 'js-cookie';
import NavBar from '../components/MainPage/NavBar';
import VisualContainer from './VisualContainer';
import UserContext from '../UserContext';
import getNewDate from '../Utils/getDateString';

export default function MainContainer() {
	const startDate = getNewDate();
	const startUser = useLoaderData();
	const [user, updateUser] = React.useState(startUser);
	const [date, changeDate] = React.useState(startDate);
	const contextObj = useMemo(() => ({
		startDate,
		user,
		date,
		updateUser,
		changeDate,
	}));

	return (
		<UserContext.Provider value={contextObj}>
			<NavBar />
			<br />
			<div className="mainContainer">
				<VisualContainer />
			</div>
		</UserContext.Provider>
	);
}

// Loader for MainContainer//
// This is placed within the component and will run before rendering the component

export const userLoader = async () => {
	const cookie = cookieParser.get('vibez'); // insert npm package method that reads our cookie here;
	if (!cookie) {
		return redirect('/');
	}
	const res = await fetch('/api/user');
	// const user = fakeDB;
	const user = await res.json();
	// console.log(user)
	return user;
};
