import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

const DeleteAccount = () => {
  let [loggedOut, setLoggedOut] = useState(false);

  const deleteAccount = async () => {
    await fetch(`/api/users`, { method: 'delete' });
    setLoggedOut(true);
  }

  return (loggedOut) ? <Redirect to="/" /> : (
    <div id="delete-account-button-holder">
      <button onClick={deleteAccount}>Delete Account</button>
    </div>
  );
}

export default DeleteAccount;
