import authHeader from '../utils/AuthService';
const ROOT_URL = 'https://mc-paymo.herokuapp.com';
 
export async function loginUser(dispatch, loginPayload) {
  try {
    dispatch({ type: 'REQUEST_LOGIN' });
    let response = await fetch(`${ROOT_URL}/api/user/login`,{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginPayload),
      });
    let data = await response.json();
 
    if (data.user) {
      dispatch({ type: 'LOGIN_SUCCESS', payload: data });
      localStorage.setItem('currentUser', JSON.stringify(data));
      return data
    }
 
    dispatch({ type: 'LOGIN_ERROR', error: data.error });
    return;
  } catch (error) {
    dispatch({ type: 'LOGIN_ERROR', error: error });
  }
}
 
export async function logout(dispatch) {
  dispatch({ type: 'LOGOUT' });
  localStorage.removeItem('currentUser');
  localStorage.removeItem('token');
}

export async function signupUser(dispatch, signupPayload) {
    try {
      dispatch({ type: 'REQUEST_SIGNUP' });
      let response = await fetch(`${ROOT_URL}/api/user/signup`,{
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(signupPayload),
        });
      let data = await response.json();
   
      if (data.user) {
        dispatch({ type: 'SIGNUP_SUCCESS', payload: data });
        localStorage.setItem('currentUser', JSON.stringify(data));
        return data
      }
   
      dispatch({ type: 'SIGNUP_ERROR', error: data.error });
      return;
    } catch (error) {
      dispatch({ type: 'SIGNUP_ERROR', error: error });
    }
}

export async function updateUser(dispatch, token) {
    let response = await fetch(`${PROCESS.env.REACT_APP_BACKEND}/api/user/me`, {headers: authHeader({token})})
    let data = await response.json()
    let userPayload = {token, user: data }
    dispatch({ type: 'UPDATE_USER', payload: userPayload })
    localStorage.setItem('currentUser', JSON.stringify(userPayload));

    return userPayload
}