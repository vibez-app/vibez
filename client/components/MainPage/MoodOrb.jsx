import React from 'react';
import fakeDB from '../../fakeDB';
import AnimatedBg from 'react-animated-bg'

function MoodOrb() {
  
  
  const date = fakeDB.days.undefined;
  console.log(date);
  const colors = date.colors;
  console.log(colors);


  return (

    <AnimatedBg colors={["rgb(47, 53, 255)"]}>
      <div className='orb'/>
    </AnimatedBg>

    
  
  )
}
 
export default MoodOrb;