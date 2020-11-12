import React from 'react';
const User = ({ user }) => (
  <>
    <strong>id:</strong> {user.id}<br />
    <strong>email:</strong> {user.email}<br />
    <strong>first name:</strong> {user.firstName}<br />
    <strong>last name:</strong> {user.lastName}<br />
    <strong>wants email:</strong> {String(user.wantsEmail)}<br />
    <strong>optional stuff:</strong> {user.optStuff}<br />
    {/* <strong>all data:</strong>{String(Object.entries(user))}<br /> */}
    <hr />
  </>
);
export default User;
