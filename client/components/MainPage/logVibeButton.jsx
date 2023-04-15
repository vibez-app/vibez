import React from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../UserContext';

function LogVibeButton() {
    const navigate = useNavigate();
    const userContext = React.useContext(UserContext);
	  const selectedDate = `${userContext.date}`;

    const clickLog = () => {
      navigate(`/log?date=${selectedDate}`)
    }

    return <div className='flex justify-center items-center m-10'>
      <button type = "button" className='bg-spotifyGreen
 h-10 w-80 rounded-2xl text-white text-3xl' onClick={clickLog}> Log the Vibe </button>
    </div>
}

export default LogVibeButton
