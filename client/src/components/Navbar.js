import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = ({ currentUserId }) => {

    return (
        <nav>
            <span>
                <NavLink to="/" activeClassName="active">Welcome to my physics simulations</NavLink>
            </span>
            <span>
                <>
                    {currentUserId &&
                        <>
                                {/* <div className="navbar-item" >
                                    <a href={`/${currentUser.user_name}`}>
                                        {currentUser.user_name}
                                    </a>
                                </div> */}
                            <span className="navbar-item" >
                                <a href="/edituser">
                                    <span >Account Details</span>
                                </a>
                            </span>
                            <span className="navbar-item" >
                                <a href="/logout">
                                    <span >Log Out</span>
                                </a>
                            </span>
                        </>
                    }
                    {!currentUserId &&
                        <>
                            {/* <span className="navbar-item">
                                <a href="/login">
                                    <span>Log In</span>
                                </a>
                            </span> */}
                            <NavLink to="/login" activeClassName="active">Log In</NavLink>
                            <span className="navbar-item" >
                                <a href="/signup">
                                    <span >Sign Up</span>
                                </a>
                            </span>
                        </>
                    }
                </>
            </span>
        </nav>
    )
}
export default Navbar;
