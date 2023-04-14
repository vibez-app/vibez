import React from 'react';
import NavBar from './NavBar';


function VibeLogInput() {
    return (
        <>
        <NavBar/>
        <div className='diary'>
            <h3>Tell me about the vibe</h3><b/>
            <input name='Vibe Log'/>
        </div>
        </>
        
    );
}
 
export default VibeLogInput;