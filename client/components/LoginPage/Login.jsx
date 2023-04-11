import React from 'react';


function Login() {
    return (
        <div className="text-white text-center text-4xl/[43.57px] font-extrabold">
            <h1 className = "text-9xl mb-[27px]">VIBEZ</h1><b/>
            <p>What vibes were you vibing.</p><b/>
            <p>Whats your vibe today.</p><b/>
            <p>What your music choices say about you.</p>
            <button className="button mt-[58px] font-normal text-[40px] rounded-[35px] w-[501px] h-[75px]"  type='submit' > <a href='/home'>Login with Spotify</a></button>
        </div>
    );
}
 
export default Login;