import React from 'react';
import styled from 'styled-components';
import UserContext from '../../UserContext';

const Orb = styled.div`
	transition: all 0.5s linear;
	background: ${(props) => props.bg};
	max-width: 450px;
	height: 450px;
	margin: auto;
	margin-top: 6%;
	border-radius: 50%;
	box-shadow: inset 0 0 50px #fff, inset 20px 0 60px violet,
		inset -20px 0 60px blue, 0 0 50px #fff, -10px 0 60px violet,
		10px 0 60px blue;
`;

function MoodOrb() {
	const userContext = React.useContext(UserContext);
	const { colors } = userContext.user.days[userContext.date] || [];
	const [index, updateIndex] = React.useState(0);

	React.useEffect(() => {
		const interval = setInterval(() => {
			updateIndex((currentIndex) =>
				(colors && currentIndex === colors.length - 1) ? 0 : currentIndex + 1
			);
		}, 500);
		return () => clearInterval(interval);
	});

	return (
		<Orb
			className="orb font-bold text-white flex justify-center items-center text-2xl"
			bg={ colors? colors[index] : ""}
		>
			{(colors && colors.length) ? '' : 'A quiet day, no vibez to show'}
		</Orb>
	);
}

export default MoodOrb;
