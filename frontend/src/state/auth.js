import axios from 'axios'

export const REGISTER = 'auth/REGISTER'
export const LOGIN = 'auth/LOGIN'
export const ERROR = 'auth/ERROR'
export const LOADING = 'auth/LOADING'
export const LOGOUT = 'auth/LOGOUT'

export const createActionLogin =
  (accountDetails) => async (dispatch, getState) => {
    try {
      const response = await axios.post(
        'http://localhost:8080/api/v1/auth/authenticate',
        accountDetails
      )
      dispatch({
        type: LOGIN,
        payload: response.data,
      })
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error.message,
      })
    }
  }

export const createActionRegister =
  (accountDetails) => async (dispatch, getState) => {
    try {
      const response = await axios.post(
        'http://localhost:8080/api/v1/auth/register',
        accountDetails
      )
      dispatch({
        type: REGISTER,
        payload: response.data,
      })
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error.message,
      })
    }
  }

export const createActionLogout = () => {
  return {
    type: LOGOUT,
  }
}

export const initialState = {
  value: null,
  error: null,
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER:
      return {
        ...state,
        value: action.payload,
      }
    case LOGIN:
      return {
        ...state,
        value: action.payload,
      }
    case ERROR:
      return {
        ...state,
        error: action.payload,
      }
    case LOGOUT:
      return initialState
    default:
      return state
  }
}

export default reducer
