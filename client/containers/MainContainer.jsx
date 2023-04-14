import React from 'react';
import { useLoaderData, redirect } from 'react-router-dom';
import cookieParser from 'js-cookie';
import NavBar from '../components/MainPage/NavBar';
import VisualContainer from './VisualContainer';
import UserContext from '../UserContext';
import getNewDate from '../getDateString';

export default function MainContainer() {
	const [user, updateUser] = React.useState(useLoaderData());
	const [date, changeDate] = React.useState(getNewDate());

	return (
		// eslint-disable-next-line react/jsx-no-constructed-context-values
		<UserContext.Provider value={{ user, date, updateUser, changeDate }}>
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
	const user = await res.json();
	return user;
};
