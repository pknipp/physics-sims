import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = ({ currentUserId, currentUser }) => {

    return (
        <nav>
            <div>
                <NavLink to="/" activeClassName="active"><h1>Home</h1></NavLink>
            </div>
            <div>
                <>
                    {currentUserId && currentUser &&
                        <>
                            <div className="navbar-item" >
                                <a href={`/${currentUser.user_name}`}>
                                    {currentUser.user_name}
                                </a>
                            </div>
                            <div className="navbar-item" >
                                <a href="/edituser">
                                    <span >Account Details</span>
                                </a>
                            </div>
                            <div className="navbar-item" >
                                <a href="/logout">
                                    <span >Log Out</span>
                                </a>
                            </div>
                        </>
                    }
                    {!currentUserId &&
                        <>
                            <div className="navbar-item">
                                <a href="/login">
                                    <span>Log In</span>
                                </a>
                            </div>
                            <div className="navbar-item" >
                                <a href="/signup">
                                    <span >Sign Up</span>
                                </a>
                            </div>
                        </>
                    }
                </>
            </div>
        </nav>
    )
}
export default Navbar;
