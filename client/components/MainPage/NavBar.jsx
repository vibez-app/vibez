import React from 'react';
import { NavLink } from 'react-router-dom';
import UserContext from '../../UserContext';

function NavBar() {
	const userContext = React.useContext(UserContext);
	return (
		<div className="navBar">
			<nav className="flex justify-between items-center">
				<NavLink className="text-4xl font-extrabold text-white">VIBEZ</NavLink>
				<NavLink className="text-white">
					Let&apos;s Vibe, {userContext.user.name}
				</NavLink>
				<NavLink>
					<img
						className="h-16 rounded-full"
						src={userContext.user.imageUrl}
						alt="profile"
					/>
				</NavLink>
			</nav>
		</div>
	);
}

export default NavBar;
