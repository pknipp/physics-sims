import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

const Signup = props => {
  const [currentUserId, setCurrentUserId] = useState(null);
  // Use this array to DRY two long lines of code below.
  const properties = ["email", "firstName", "lastName", "password", "password2", "optStuff"];
  const initialInputs = {};
  properties.forEach(property => {
    initialInputs[property] = "";
  })
  initialInputs.wantsEmail = false;
  let [inputs, setInputs] = useState(initialInputs);
  //DRY the following line thru the use of the "properties" array defined at the top.
  const { email, firstName, lastName, wantsEmail, optStuff, password, password2 } = inputs

  const updateValue = e => {
    let newInputs = {...inputs};
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    console.log("name = ", e.target.name, " value = ", value);
    newInputs[e.target.name] = value;
    setInputs(newInputs);
  }

  const handleSubmit = async e => {
    e.preventDefault();
    // DRY the code below thru the use of the "properties" array defined at the top.
    const body = JSON.stringify({ email, firstName, lastName, optStuff, password, password2, wantsEmail })
    // errorsContainer.innerHTML = '';
    const res = await fetch('/api/users', {
       method: "POST", body, headers: { "Content-Type": "application/json" } });
    //const data = await res.json();
    if (!res.ok) {
    //   const { message, errors } = data;
    //   for (let error of errors) {
    //     const errorLi = document.createElement('li');
    //     errorLi.innerHTML = error;
    //     errorsContainer.appendChild(errorLi);
    //   }
    //   return;
    }
    //const response = await fetch(`/api/session`, {
    //   method: 'put',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email, password }),
    // });
    if (res.ok) {
       const { user } = await res.json();
       props.updateUser(user.id);
       setCurrentUserId(user.id);
    }
  }
//to do eventually:
//  decompose optStuff into different components
  // do optStuff as a text area, for now
  return (props.currentUserId) ? <Redirect to="/" /> : (
    <main className="centered middled">
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" name="email" value={email} onChange={updateValue} required />
        <input type="text" placeholder="First Name" name="firstName" value={firstName} onChange={updateValue} required/>
        <input type="text" placeholder="Last Name" name="lastName" value={lastName} onChange={updateValue} required/>
        <span>Would you like email from us?</span><input type="checkbox" value={wantsEmail} name="wantsEmail" onChange={updateValue} />
        <input type="text" placeholder="Optional stuff" name="optStuff" value={optStuff} onChange={updateValue} />
        <input type="password" placeholder="Password" name="password" value={password} onChange={updateValue} required />
        <input type="password" placeholder="Confirm password" name="password2" value={password2} onChange={updateValue} required />
        <button type="submit">Signup</button>
      </form>
    </main>
  );
}
export default Signup;
