import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faChevronLeft, faChevronRight} from '@fortawesome/free-solid-svg-icons';
import MoodOrb from './MoodOrb';
import UserContext from '../../UserContext';
import formatDateString from '../../Utils/formatDateString';
import getDateString from '../../Utils/getDateString';



// onClick={console.log(getDateString(userContext.date, "previous"))}

// Downloaded and imported fontawesome so an arrow icon can be used 
// Used flex box on the button's parent class to center the arrow icon into the box
// Styled the box to look bigger and when the user hovers it will change color - Cristian
function Visualizer() {
	const userContext = React.useContext(UserContext);
	return (
		<div className="orbContainer">
			<div className="backButton flex flex-col justify-center">
                <button type="button" onClick={()=>{userContext.changeDate(getDateString(userContext.date, "previous"))}} className="h-[100%] arrow-icon fa-7x"> <FontAwesomeIcon icon={faChevronLeft} className="hover:text-indigo-500 bg-transparent text-white"/></button>
			</div>
			<div className="orbVisualizer">
				<p className="text-white font-bold text-center">
					{formatDateString(userContext.date)}
				</p>
				<MoodOrb />
			</div>
			{(userContext.date !== userContext.startDate) && <div className="nextButton flex flex-col justify-center">
                <button type="button" onClick={()=>{userContext.changeDate(getDateString(userContext.date, "next"))}} className="h-[100%] fa-7x" > <FontAwesomeIcon icon={faChevronRight} className="hover:text-indigo-500 bg-transparent text-white"/></button>
                </div>}
		</div>
	);
}
 
export default Visualizer;