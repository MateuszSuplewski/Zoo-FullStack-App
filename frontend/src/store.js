import thunk from 'redux-thunk'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import authReducer from './state/auth'
import animalsReducer from './state/animals'
import cartReducer from './state/cart'
import axios from 'axios'

const LOCAL_STORAGE_KEY = 'ZooAuthorization'
const preloadedState = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || undefined

const rootReducer = combineReducers({
  auth: authReducer,
  animals: animalsReducer,
  cart: cartReducer
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
  const { auth, cart } = state
  const { value } = auth
  if(value){
    const { token } = value
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ token, cart })) // change to auth so there will be no conflicts between redux & storage
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    
  }
  else{
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(null))
    delete axios.defaults.headers.common['Authorization']
  }
})

export default store