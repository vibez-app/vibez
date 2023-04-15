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
				<NavLink className="fixed bottom-5 left-5 font-bold text-white">
					Let&apos;s Vibe, {userContext.user.name}
				</NavLink>
				<NavLink>
					{userContext.user.imageUrl ? (
						<img
							className="h-16 rounded-full"
							src={userContext.user.imageUrl}
							alt="profile"
						/>
					) : (
						<div className="rounded-full h-16 w-16 font-bold text-white bg-spotifyGreen flex justify-center items-center text-2xl">
							{userContext.user.name[0].toUpperCase()}
						</div>
					)}
				</NavLink>
				<NavLink
					className="fixed bottom-5 right-5 font-bold text-white"
					onClick={logoutHandler}
				>
					LOGOUT
				</NavLink>
			</nav>
			{redirectLogin && <Navigate to="/" />}
		</div>
	);
}

export default NavBar;
