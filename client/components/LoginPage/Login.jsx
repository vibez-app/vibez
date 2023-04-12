import React from 'react';
// import axios from 'axios';

function Login() {


	return (
		<div className="mt-[10%] text-white text-center text-4xl/[43.57px] font-extrabold">
			<h1 className="text-9xl mb-[27px]">VIBEZ</h1>
			<br />
			<p>What vibes were you vibing.</p>
			<p>Whats your vibe today.</p>
			<p>What your music choices say about you.</p>
			<br />
			<a
				className="bg-green-400 p-1.5 mt-[40px] font-normal text-[px] rounded-[35px] w-[5px] h-[75px]"
				href="/login"
			>
				Login with Spotify
			</a>
		</div>
	);
}

export default Login;
