import React from 'react';
import MoodOrb from './MoodOrb';

function Visualizer() {
    return (
        <div className="orbContainer">
            <div className='backButton'>backButton</div>
            <div className='orbVisualizer'>
            <MoodOrb/>
            </div>
            <div className='nextButton'>nextButton</div>
        </div>
    );
}
 
export default Visualizer;