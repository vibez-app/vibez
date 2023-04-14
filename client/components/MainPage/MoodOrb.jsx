import React from 'react';
// import fakeDB from '../../fakeDB';
// import AnimatedBg from 'react-animated-bg'
import styled, { keyframes } from 'styled-components';

function MoodOrb() {
  
  
  // const date = fakeDB.days.undefined;
  // console.log(date);
  const colors = [
    "#FF5733",
    "#3396FF",
    "#33FF42",
    "hsl(207.8,48.8,50)",
    "hsl(233.8,20.4,50)",
    "hsl(171.2,48.4,50)",
    "hsl(75.79999999999998,78.8,50)",
    "hsl(185.8,32.1,50)",
    "hsl(211.2,43.9,50)",
    "hsl(221.4,28.7,50)",
    "hsl(207.4,50.7,50)",
    "hsl(222.8,14.499999999999998,50)",
    "hsl(240.82,15.4,50)",
    "hsl(159.8,41.9,50)",
    "hsl(211.4,21.4,50)",
    "hsl(211.4,58.9,50)",
    "hsl(174.4,61.5,50)",
    "hsl(200.8,72.7,50)",
    "hsl(221.4,37.6,50)",
    "hsl(151.8,58.4,50)",
    "hsl(202.6,34.9,50)",
    "hsl(225.4,33.800000000000004,50)",
    "hsl(202.8,54.900000000000006,50)",
    "hsl(141.2,55.900000000000006,50)",
    "hsl(224.8,48.199999999999996,50)",
    "hsl(172.8,76.6,50)",
    "hsl(215,31.900000000000002,50)",
    "hsl(184,71.2,50)",
    "hsl(123.19999999999999,74.2,50)",
    "hsl(194.8,41.199999999999996,50)",
    "hsl(209.8,22,50)"
  ]

//   const rotate = keyframes`
//   from {
//     transform: rotate(0deg);
//   }

//   to {
//     transform: rotate(360deg);
//   }
// `;

// // Here we create a component that will rotate everything we pass in over two seconds
// const Rotate = styled.div`
//   display: inline-block;
//   animation: ${rotate} 2s linear infinite;
//   padding: 2rem 1rem;
//   font-size: 1.2rem;
// `;

// return(
//   <Rotate>&lt; 💅🏾 &gt;</Rotate>
// );


  const roulette = keyframes`
    0% { background: ${colors[0]} },
    10% { background: ${colors[1]} },
    20% { background: ${colors[2]} },
    30% { background: ${colors[colors.length-4]} },
    40% { background: ${colors[colors.length-5]} },
    50% { background: ${colors[colors.length-6]} },
    60% { background: ${colors[colors.length-7]} },
    70% { background: ${colors[colors.length-8]} },
    80% { background: ${colors[colors.length-9]} },
    90% { background: ${colors[colors.length-10]} },
    100% {
      WebkitTransform: "rotate(360deg)",
      transform: "rotate(360deg)",
      background: ${colors[colors.length-1]}
    }`;
  

  const Orb = styled.div`
      animation: ${roulette} 10s infinite,
      position: relative,
      width: 450px,
      height: 450px,
      margin: auto,
      marginTop: 6%,
      borderRadius: 50%,
      background: TEAL,
      boxShadow: inset 0 0 30px white,\n\n\ninset 20px 0 150px violet,\ninset -20px 0 150px blue,\n0 0 50px #fff,\n-10px 0 60px violet,\n10px 0 60px blue
    `
  


  console.log(Orb)
  


  return ( 
    
           <Orb>THING</Orb>
       
       
        
    
   )
}
 
export default MoodOrb;