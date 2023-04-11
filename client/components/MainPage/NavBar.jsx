import React from 'react';
import { NavLink } from 'react-router-dom';


function NavBar() {
    return (
        <div className='navBar'>
            <nav>
                <NavLink to='/login'>LOGIN</NavLink>
                <NavLink to='/home'>TODAYS VIBEZ</NavLink>
                <NavLink to='/log'>LOG A VIBE</NavLink>
            </nav>
        </div>
    );
}
 
export default NavBar;