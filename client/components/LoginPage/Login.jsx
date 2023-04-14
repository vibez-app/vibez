import React from 'react';
import { redirect } from 'react-router-dom';
import cookieParser from 'js-cookie';
// import axios from 'axios';

export default function Login() {
	return (
		<div className="mt-[10%] text-white text-center text-4xl/[43.57px] font-extrabold">
			<h1 className="text-9xl mb-[27px]">VIBEZ</h1>
			<br />
			<p>What vibes were you vibing.</p>
			<p>Whats your vibe today.</p>
			<p>What your music choices say about you.</p>
			<br />
			<a
				className="button p-[11] mt-[40px] font-normal text-[40px] rounded-[35px] inline-block w-[480px]"
				href="/api/login"
			>
				Login with Spotify
			</a>
		</div>
	);
}

//LOADER FOR CHECKING IF THE COOKIE EXISTS

export const userLoggedIn = async () => {
	const cookie = cookieParser.get('vibez'); //insert npm package method that reads our cookie here;
	if (cookie) {
		return redirect('/home');
	}
	return null;
};
