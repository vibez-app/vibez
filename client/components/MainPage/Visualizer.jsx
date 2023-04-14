import React from 'react';
import MoodOrb from './MoodOrb';
import UserContext from '../../UserContext';
import formatDateString from '../../formatDateString';

function Visualizer() {
	const userContext = React.useContext(UserContext);
	return (
		<div className="orbContainer">
			<div className="backButton">
				<div className="arrow left"></div>
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
