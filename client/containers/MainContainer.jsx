import React, { useMemo, useState } from 'react';
import { useLoaderData, redirect } from 'react-router-dom';
import cookieParser from 'js-cookie';
import NavBar from '../components/MainPage/NavBar';
import VisualContainer from './VisualContainer';

import LogVibeContainer from './LogVibeContainer'
import UserContext from '../UserContext';
import getNewDate from '../Utils/getDateString';

export default function MainContainer() {
	const startDate = getNewDate();
	const startUser = useLoaderData();
	const [toLog, setToLog] = useState(false);
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
			{!toLog &&
				<div className="mainContainer">
					<VisualContainer />
				</div>
			}
			{toLog &&
				<LogVibeContainer/>
			}
			<div className='flex justify-center items-center m-10'>
      	<button type = "button" className='bg-spotifyGreen h-10 w-80 rounded-2xl text-white text-3xl' onClick={()=> setToLog(!toLog)}> Log the Vibe </button>
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
	return user;
};
