import React from 'react';
import axios from 'axios';

function Login() {

const api = axios.create({
	baseURL: 'http://localhost:3000/',
});

const handler = () => {
	api
		.get('/login', {});
};


    return (
        <div className="mt-[10%] text-white text-center text-4xl/[43.57px] font-extrabold">
            <h1 className = "text-9xl mb-[27px]">VIBEZ</h1><b/>
            <p>What vibes were you vibing.</p><b/>
            <p>Whats your vibe today.</p><b/>
            <p>What your music choices say about you.</p>
            <button className="button mt-[58px] font-normal text-[40px] rounded-[35px] w-[501px] h-[75px]"  type='submit'  onClick={handler}>Login with Spotify</button>
        </div>
    );
}
 
export default Login;