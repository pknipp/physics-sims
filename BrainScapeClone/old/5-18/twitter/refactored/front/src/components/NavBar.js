import React from 'react';
import { NavLink } from 'react-router-dom';
import { logout } from '../store/authentication';
import { connect } from 'react-redux';

const NavBar = ({loggedIn, logOut}) => { // we use object destructuring on our props
  return(<nav><h1>Welcome to BrainScape</h1>
      {loggedIn ? <><NavLink to="/">Home</NavLink><button onClick={logOut}>Log Out</button> </>
      : <> <NavLink to="/login">Log In</NavLink><NavLink to="/signup">Sign Up</NavLink></>}
    </nav>)}

// destructuring to take relevant slice of Redux state.  State is accessible w/in msp & mdp.
const msp = (state) => ({loggedIn: !!state.auth.id});
const mdp = dispatch => ({logOut: () => dispatch(logout())})
export default connect(msp, mdp)(NavBar);
