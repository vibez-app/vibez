import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faChevronLeft, faChevronRight} from '@fortawesome/free-solid-svg-icons';
import MoodOrb from './MoodOrb';
import UserContext from '../../UserContext';
import formatDateString from '../../Utils/formatDateString';

// Downloaded and imported fontawesome so an arrow icon can be used 
// Used flex box on the button's parent class to center the arrow icon into the box
// Styled the box to look bigger and when the user hovers it will change color - Cristian
function Visualizer() {
	const userContext = React.useContext(UserContext);
	return (
		<div className="orbContainer">
			<div className="backButton">
				<div className="arrow left" />
			</div>
			<div className="orbVisualizer">
				<p className="text-white font-bold text-center">
					{formatDateString(userContext.date)}
				</p>
				<MoodOrb />
			</div>
			<div className="nextButton">nextButton</div>
		</div>
	);
}
 
export default Visualizer;
