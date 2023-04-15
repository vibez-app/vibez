import React from 'react';
import { useNavigate } from 'react-router-dom';

function LogVibeButton() {
    const navigate = useNavigate();
    const clickLog = () => {
      navigate("/2023-04-08")
    }

    return <div className='flex justify-center items-center m-10'>
      <button type = "button" className='bg-green-500
 h-20 w-96 rounded-2xl text-white text-5xl' onClick={clickLog}> Log the Vibe </button>
    </div>
}

export default LogVibeButton
