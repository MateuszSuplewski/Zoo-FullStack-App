import AuthAPI from "../api/authProvider"

const api = new AuthAPI('http://localhost:8080/api/v1/auth')


export const REGISTER = 'auth/REGISTER'
export const LOGIN = 'auth/LOGIN'
export const LOGOUT = 'auth/LOGOUT'
export const ERROR = 'auth/ERROR'
export const START = 'auth/START'
export const STOP = 'auth/STOP'


export const createActionRegister = (accountDetails) => async (dispatch, getState) => {
  dispatch(createActionStart())
  api
    .register(accountDetails, 'register')
    .then((resp) => {
      dispatch({
        type: REGISTER,
        payload: resp.data,
      })
    })
    .catch((err) => {
      dispatch({
        type: ERROR,
        payload: err.message,
      })
    })
    .finally(() => dispatch(createActionStop()))

}


export const createActionLogin = (accountDetails) => async (dispatch, getState) => {
  dispatch(createActionStart())
  api
    .login(accountDetails, 'authenticate')
    .then((resp) => {
      dispatch({
        type: LOGIN,
        payload: resp.data,
      })
    })
    .catch((err) => {
      dispatch({
        type: ERROR,
        payload: err.message,
      })
    })
    .finally(() => dispatch(createActionStop()))

}

export const createActionLogout = () => ({
  type: LOGOUT,     
})

const createActionStart = () => ({
  type: START,
})

const createActionStop = () => ({
  type: STOP,
})

export const initialState = {
  value: null,
  loading: false,
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
    case LOGOUT:
      return initialState
    case ERROR:
      return {
        ...state,
        error: action.payload,
      }
    case START:
      return {
        ...state,
        loading: true,
        value: initialState.value,
        error: initialState.error
      }
    case STOP:
      return {
        ...state,
        loading: initialState.loading
      }
    default:
      return state
  }
}

export default reducer
