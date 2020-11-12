import Cookies from "js-cookie";

export const SET_USER = 'SET_USER';
// export const REMOVE_USER = 'authentication/REMOVE_USER';
// export const SIGNUP = 'SIGNUP';

//actions
export const setUser = user  => ({type: SET_USER, user});
// const removeUser = () => ({type: REMOVE_USER});
// const newUser = user  => ({type: SIGNUP, user});

export const login = (email, password) => {
  return async dispatch => {
    const csrfToken = Cookies.get("XSRF-TOKEN");
    const res = await fetch('/api/session', {
      method : "put",
      headers: {"Content-Type": "application/json","X-CSRF-TOKEN": csrfToken},
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json(); // current user info
    res.data = data;
    if (res.ok) dispatch(setUser(data.user));
    return res;
    // later insert some error handling somewhere
  };
};

window.login = login;

// export const logout = () => {
//   return async (dispatch) => {
//     const res = await fetch('/api/users/session', {method: "delete"});
//     if (res.ok) dispatch(removeUser());
//     // Are following 2 lines needed for error handling?
//     res.data = await res.json();
//     return res;
//   };
// };

// export const signup = (username, email, password, password2) => {
//   return async (dispatch) => {
//     const res = await fetch('/api/users', {
//       method : "post",
//       headers: {"Content-Type": "application/json"},
//       body   : JSON.stringify({ username, email, password, password2 })
//     });
//     const data = await res.json();
//     dispatch(newUser(data));
//     // Are following two lines used for error handling?
//     res.data = data;
//     return res;
//   };
// }

export default function authReducer(state = {}, action) {
  switch (action.type) {
//    case SET_USER || SIGNUP:
    case SET_USER:
      return action.user;
    // case REMOVE_USER:
    //   return {};
    default:
      return state;
  }
}
