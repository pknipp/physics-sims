import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

const Login = props => {
  const [email   , setEmail   ] = useState('demo@aol.com');
  const [password, setPassword] = useState('password'        );
  const [currentUserId, setCurrentUserId] = useState(null);

  const updateValue = e => (e.target.name === "email") ? setEmail(e.target.value) : setPassword(e.target.value)

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await fetch(`/api/session`, {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) {
      const { user } = await res.json();
      props.updateUser(user.id);
      setCurrentUserId(user.id);
    }
  }

  return (currentUserId) ? <Redirect to="/" /> : (
    <main className="centered middled">
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" name="email" value={email} onChange={updateValue} />
        <input type="password" placeholder="Password" name="password" value={password} onChange={updateValue} />
        <button type="submit">Login</button>
      </form>
    </main>
  );
}
export default Login;
