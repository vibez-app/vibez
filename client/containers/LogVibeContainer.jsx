import React, { useState } from 'react';
import axios from 'axios';
import UserContext from '../UserContext';
import MoodOrb from '../components/MainPage/MoodOrb';


function LogVibeContainer() {

  
  const userContext = React.useContext(UserContext);
  const [log, setLog] = useState(userContext.user.days[userContext.date].log)


  async function updateEntry (event) {
    setLog(event.target.value)
    console.log(log)
    await axios.patch(`/api/user?date=${userContext.date}`, {log}).then((response) => {
      console.log(response)
      console.log("success");
    }).catch((err) => console.log(err));
    const newUser = structuredClone(userContext.user);
    newUser.days[userContext.date].log = log
    userContext.updateUser(newUser);
  }
  
  return (
    <div className='grid grid-cols-2 mx-64 mb-10 h-3/4 justify-center'>
      <div className='grid  mx-10 content-center pb-10 '>
        <MoodOrb />
      </div>

      <div className='grid grid-rows-5 -mt-20 text-white '>
        <p className=' row-span-1 flex justify-center items-center font-extrabold text-5xl'>
          Tell me about the vibe
        </p>
        <textarea placeholder ="Take a moment to reflect on how you felt today. Why do you think you listened to these songs? How did these songs change your mood" value = {log} className='glassyContainer row-span-4 flex justify-center p-5 text-2xl' onChange={(e) =>updateEntry(e)}/>
      </div>
    </div>
  )
}

export default LogVibeContainer
