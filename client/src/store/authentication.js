// incorporate signup
import Cookies from "js-cookie";

const SET_USER = "physics_sims/authentication/SET_USER";
const REMOVE_USER = "physics_sims/authentication/REMOVE_USER";
const NEW_USER = "physics_sims/authentication/NEW_USER";

export const setUser    = user => ({ type: SET_USER, user })
export const removeUser = _    => ({ type: REMOVE_USER    })
export const newUser    = user => ({ type: NEW_USER, user })

export const login = (email, password) => {
  // debugger
  return async dispatch => {
    const response = await fetch(`/api/session`, { method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (response.ok) dispatch(setUser((await response.json()).user))
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
    case REMOVE_USER:
      return {};
    default:
      return state;
  }
}
