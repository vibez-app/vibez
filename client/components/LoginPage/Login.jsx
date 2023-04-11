import React from 'react';
// import axios from 'axios';

function Login() {


const CLIENT_ID = '1b713d514ffa42d5bfe3a41a1d1c7ec3';
const REDIRECT_URI = "http://localhost:8080/home";
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const RESPONSE_TYPE = "token";



    return (
        <div className="mt-[10%] text-white text-center text-4xl/[43.57px] font-extrabold">
            <h1 className = "text-9xl mb-[27px]">VIBEZ</h1><br/>
            <p>What vibes were you vibing.</p>
            <p>Whats your vibe today.</p>
            <p>What your music choices say about you.</p><br/>
            <a className="bg-green-400 p-1.5 mt-[40px] font-normal text-[px] rounded-[35px] w-[5px] h-[75px]" href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login with Spotify</a>
        </div>
    );
}
 
export default Login;