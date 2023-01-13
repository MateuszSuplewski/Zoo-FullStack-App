import thunk from 'redux-thunk'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import validateUserReducer from './state/validateUser'

const LOCAL_STORAGE_KEY = 'ZooAuthorization'
const preloadedState = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || undefined

const rootReducer = combineReducers({
  auth: validateUserReducer,
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
  
  // const { cart } = state
  //localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ cart }))
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({auth}))
})

export default store