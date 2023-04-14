import React from 'react';
import { NavLink, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import UserContext from '../../UserContext';

function NavBar() {
	const userContext = React.useContext(UserContext);
	const [redirectLogin, toggleRedirectLogin] = React.useState(false);

	const logoutHandler = () => {
		Cookies.remove('vibez');
		return toggleRedirectLogin(true);
	};
	return (
		<div className="navBar">
			<nav className="flex justify-between items-center">
				<NavLink className="text-4xl font-extrabold text-white">VIBEZ</NavLink>
				<NavLink className="font-bold text-white">
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
			<NavLink
				className="fixed bottom-5 right-5 font-bold text-white"
				onClick={logoutHandler}
			>
				LOGOUT
			</NavLink>
			{redirectLogin && <Navigate to="/" />}
		</div>
	);
}

export default NavBar;
