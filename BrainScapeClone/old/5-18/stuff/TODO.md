TO DO:
in general:
figure out how to use tools in inspector: Components and Redux DevTools
Why is it 1 s for that anonymous async middlewaare in back/app.js?

on front: remove superfluous buttons on login/signup page
authorization.js: rename to authReducer, and move down into directory
consolidate two instances of authReducer?

on back: modify disableFormButton in utils/auth.js
for routes/api/users, make email unique, to facilitate lookup (w/out Or)
in model file, understand the following snippets:

defaultScope: {attributes: {exclude: ["hashedPassword", "email", "createdAt", "updatedAt"]}},
      scopes: {
        currentUser: {attributes: { exclude: ["hashedPassword"] }},
        loginUser: {attributes: {}},
      }

User.prototype.toSafeObject = function() {return {
    id: this.id, firstName: this.firstName, lastName: this.lastName, email: this.email
  }};

on both:
accomodate the fact that BrainScape's user data
is slightly different from that of Twitter, in
terms of amounts, required's, etc.
handle login errors properly (ref. taskdragon)
  Start this process by logging the data returning
    from the fetch processes

on twitter:
figure out error caused when attempting to tweet
figure out how front-end port is set to 3000

Outline of Data flow:
redux state: {tweets, users, auth}
  auth points to a pojo w/an ID, username, and token
  users points to a (often empty?) object
  tweets points to a (often empty?) object


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Your React App will live here.  While is development, run this application from this location using `npm start` or `yarn start`.

No environment variables are needed to run this application in development,
but be sure to edit the "proxy" in the `package.json` if needed.

This app will be automatically built when you deploy to heroku, please see the `heroku-postbuild` script in your `express.js` application's `package.json`, **NOT** React's `package.json` to see how this works.

For CSRF Protection on all request methods besides `GET`, you need to define a `X-CSRF-TOKEN` header that has a value of the `XSRF-TOKEN` cookie.

Example of a fetch request with CSRF:

import Cookies from 'js-cookie';

const login = async () => {
  const csrfToken = Cookies.get("XSRF-TOKEN");
  const res = await fetch("/api/session", {
    method: "put",
    headers: { "Content-Type": "application/json", "X-CSRF-TOKEN": csrfToken},
    body: JSON.stringify({ username: "Demo-lition", password: "password" })}
  );
  res.data = await res.json(); // current user info
  if (res.ok) return res.data;
};
