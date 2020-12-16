// incorporate signup
import Cookies from "js-cookie";

const SET_USER = "physics_sims/authentication/SET_USER";
const SET_MESSAGE="physics_sims/authentication/SET_MESSAGE";
const REMOVE_USER = "physics_sims/authentication/REMOVE_USER";
const NEW_USER = "physics_sims/authentication/NEW_USER";

export const setUser    = user => ({ type: SET_USER, user });
export const setMessage = message=>{
  // console.log("function creator says " , message);
  return {type: SET_MESSAGE, message};
}
export const removeUser = _    => ({ type: REMOVE_USER    })
export const newUser    = user => ({ type: NEW_USER, user })

export const login = (email, password) => {
  return async dispatch => {
    const response = await fetch(`/api/session`, { method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    let data = await response.json();
    console.log(data);

    // if (response.ok) {
    //   dispatch(setUser(data.user))
    // } else {
    //   dispatch(setMessage(data.error.errors[0].msg))
    // }

    if (response.ok) dispatch(setUser(data.user))
    if (!response.ok)dispatch(setMessage(data.message))
  };
};

export const signup = (email, password) => {
  return async dispatch => {
    const response = await fetch(`/api/users`, { method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    let data = await response.json();
    if (response.ok) {
      dispatch(setUser(data.user))
    } else {
      dispatch(setMessage(data.error.errors[0].msg))
    }
  };
};

export const logout = () => async dispatch => {
  const res = await fetch('/api/session', { method: "delete" });
  if (res.ok) dispatch(removeUser());
}

const loadUser = () => {
  const authToken = Cookies.get("token");
  if (authToken) {
    try {
      const payload = authToken.split(".")[1];
      const decodedPayload = atob(payload);
      const payloadObj = JSON.parse(decodedPayload);
      const { data } = payloadObj;
      return data;
    } catch (e) {
      Cookies.remove("token");
    }
  }
  return {};
}

export default function reducer(state=loadUser(), action) {
  switch (action.type) {
    case SET_USER:
      return action.user;
    case SET_MESSAGE:
      // console.log("reducer say ", action.message)
      return {message: action.message};
    case REMOVE_USER:
      return {};
    default:
      return state;
  }
}
