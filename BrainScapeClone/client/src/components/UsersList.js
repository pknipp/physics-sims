import React, { useEffect, useState } from 'react';
import User from './User';
const UsersList = props => {
    let [users, setUsers] = useState([]);
    useEffect(() => {(async () => {
            const res = await fetch('/api/users/');
            setUsers(await res.json());
        })()}, [users.length]);
    let userComponents = users.map(user => <User key={user.id} user={user} />)
    return (
        <>
            <h1>User List: </h1>
            {userComponents}
        </>
        );
}
export default UsersList;
