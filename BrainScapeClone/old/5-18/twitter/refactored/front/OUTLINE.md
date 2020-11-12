outline of logic for front-end auth:

index.js
  wrapped w/BrowserRouter (from react-router-dom)
  wrapped store (from configureStore)-Provider (from react-redux)
  calls (& imports) App.js

App.js (functional)
  Defines Protected route, which has 1 parameter: a pojo w/3 properties:
    component:Component (to protect), loggedIn, and ...rest (spread properties?)
      returns (loggedIn) ? <Rt {...rest} comp={Comp}> : <Redirect to="/login">
  Protected rt is connected w/msp = state => ({loggedIn: !!state.auth.id});
  App then calls NavBar (sans props) + 3 Switch-wrapped comps (w/“exact”):
    connProtRt to Success ("/") & Login & Signup (each comp w/obvious path)

NavBar (functional) has 1 arg: pojo w/2 properties: loggedIn & logOut (fn)
  loggedIn points to !!auth.id (facilitated by msp)
  logOut points to logout fn (facilated by mdp, but comes from where: Redux?)
  NavBar's return includes a simple header and ...
    (loggedIn) ? (home NavLink + logout button) : (login NavLink + signup NavLink)
Of course NavBar is connected to msp & mdp before export
==================================================================================
Success (functional, trivial)

Login (class): this.state = {username, password}
  2 inst methods in constr: updateUsername & -Password (don’t call setState)
  2 methods outside constructor:
    updateField (returns a function, rather than side-affecting or returning a value)
    handleSubmit, which invokes login (imported "* as authActions" from
       store/authentication.js)
  This comp renders (loggedIn) ? Redirect("/") :  form w/2 inputs & a submit button.
  msp points loggedIn to !!state.auth.id, and mdp points login to a login invocation
  Login is connected to msp & mdp before exporting

store/authentication.js:
  This contains 3 functions (login, logout, and signup), each returning an async
    (fetch) fn that takes dispatch as an arg, and dispatches the awaited return
    of the json-ed data as the arg of an action creator which is - itself - the arg
    of "dispatch" (except for logout, for which the action creator takes no arg).
    Fetch methods are     put,      delete, and  post respectively.
    Action creators are   SET_USER, REMOVE_USER, SIGN_UP.

Signup (class): this.state = username, email, password, & password2 (all as '')
  4 instance methods in constructor, all like this:
        this.updateUsername = this.updateField('username')
  2 instance methods outside of constructor:
    updateField, which is same as that for Login
    handleSubmit: async function which awaits the #signup method before
       synchronously invoking login(res, password)
  This renders (loggedIn) ? <Redirect "/"> : form w/4 inputs and a button.
  msp points loggedIn to !!auth.id, as usual
  mdp points to two properties, the 1st points to signup, & the 2nd to login
