import thunk from 'redux-thunk'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import authReducer from './state/auth'
import animalsReducer from './state/animals'
import axios from 'axios'

const LOCAL_STORAGE_KEY = 'ZooAuthorization'
const preloadedState = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || undefined

const rootReducer = combineReducers({
  auth: authReducer,
  animals: animalsReducer
})

const store = createStore(
  rootReducer,
  preloadedState,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

store.subscribe(() => {
  const state = store.getState()
  const { auth } = state
  const { value } = auth
  if(value){
    const { token } = value
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ token }))
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    
  }
  else{
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(null))
    delete axios.defaults.headers.common['Authorization']
  }
  // const { cart } = state
  //localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ cart }))

})

export default store