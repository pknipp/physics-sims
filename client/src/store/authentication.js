import Cookies from "js-cookie";

const SET_USER = "physics_sims/authentication/SET_USER";
const SET_MESSAGE="physics_sims/authentication/SET_MESSAGE";
const REMOVE_USER = "physics_sims/authentication/REMOVE_USER";
const NEW_USER = "physics_sims/authentication/NEW_USER";

export const setUser    = user   => ({ type: SET_USER, user });
export const setMessage = message=> ({type: SET_MESSAGE, message});
export const removeUser = _      => ({ type: REMOVE_USER    });
export const newUser    = user   => ({ type: NEW_USER, user })
// export const deleteuser = _      => ({ type: DELETE_USER    })

export const login = (email, password) => {
  return async dispatch => {
    const response = await fetch(`/api/session`, { method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    let data = await response.json();
    if (response.ok) dispatch(setUser(data.user))
    if (!response.ok)dispatch(setMessage(data.error.errors[0].msg || data.message))
  };
};

export const signup = (email, password) => {
  return async dispatch => {
    const res = await fetch(`/api/users`, { method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    let data = await res.json();
    dispatch(res.ok ? setUser(data.user) : setMessage(data.error.errors[0].msg));
  };
};

export const editUser = (email, password, id) => {
  // console.log("editUser's 3 inputs are ", email, password, id);
  return async dispatch => {
    const res = await fetch(`/api/users`, { method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, id })
    });
    let data = await res.json();
    // dispatch(res.ok ? setUser(data.user) : setMessage(data.error.errors[0].msg));
    dispatch(setUser(data.user));
  };
};

export const deleteUser = id => {
  // debugger
  return async dispatch => {
    const res = await fetch(`/api/users/${id}`, { method: 'DELETE'});
    if (res.ok) dispatch(removeUser());
  }
}

export const logout = _ => async dispatch => {
  const res = await fetch('/api/session', { method: "delete" });
  if (res.ok) dispatch(removeUser());
}

export const resetMessage = _ => dispatch => dispatch(setMessage(""));

const loadUser = () => {
  const authToken = Cookies.get("token");
  if (authToken) {
    try {
      const payload = authToken.split(".")[1];
      const decodedPayload = atob(payload);
      const payloadObj = JSON.parse(decodedPayload);
      // const { data } = payloadObj;
      return payloadObj.data;
    } catch (e) {
      Cookies.remove("token");
    }
  }
  return {};
}

export default function reducer(state=loadUser(), action) {
  let newState = {...state}
  switch (action.type) {
    case SET_USER:
      return action.user;
    case SET_MESSAGE:
      newState.message = action.message;
      return newState;
    case REMOVE_USER:
      // debugger
      return {};
    default:
      return state;
  }
}
