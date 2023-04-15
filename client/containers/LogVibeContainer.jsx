import React, { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import axios from 'axios';
import MoodOrb from '../components/MainPage/MoodOrb';
import NavBar from '../components/MainPage/NavBar';


function LogVibeContainer() {
  const date = "2023-04-08"
  const [log, setLog] = useState("")
  useEffect(() => {
    const fetchData = async () => {
        axios.get('/api/user?date=2023-04-08').then((response) => {
          if(response.data.days[date].log){
            setLog(response.data.days[date].log)
            console.log(log)
          }
        })
    }
    fetchData();
  }, [])
   // fetch data first

  async function updateEntry (event) {
    setLog(event.target.value)
  
    await axios.patch('/api/user?date=2023-04-08', {log}).then(() => {
      console.log("success");
    }).catch((err) => console.log(err));
  }
  
  return (
    <><NavBar />
    <div className='grid grid-cols-2 mx-64 mt-20 mb-10 h-3/4 justify-center'>
      <div className='grid  bg-black mx-10 content-center pb-10 glassyContainer'>
        <MoodOrb />
      </div>

      <div className='grid grid-rows-5 gap-5 text-white '>
        <p className='glassyContainer row-span-1 flex justify-center items-center font-extrabold text-5xl'>
          Tell me about the vibe
        </p>
        <textarea placeholder ="Take a moment to reflect on how you felt today. Why do you think you listened to these songs?" value = {log} className='glassyContainer row-span-4 flex justify-center p-5 text-lg' onChange={(e) =>updateEntry(e)}/>
      </div>
    </div></>
  )
}

export default LogVibeContainer
