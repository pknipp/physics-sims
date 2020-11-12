import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

const Logout = () => {
  let [loggedOut, setLoggedOut] = useState(false);

  const logout = async () => {
    await fetch(`/api/session`, { method: 'delete' });
    setLoggedOut(true);
  }

  return (loggedOut) ? <Redirect to="/login" /> : (
    <div id="logout-button-holder">
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Logout;
