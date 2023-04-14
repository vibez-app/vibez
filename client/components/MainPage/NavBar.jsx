import React from 'react';
import { NavLink } from 'react-router-dom';

function NavBar() {
	return (
		<div className="navBar">
			<nav>
				<NavLink
					className="text-4xl mb-[27px] font-extrabold text-white"
					to="/"
				>
					VIBEZ
				</NavLink>
				<NavLink className="right-0">Lets vibe JohnnyBoy</NavLink>
			</nav>
		</div>
	);
}

export default NavBar;
