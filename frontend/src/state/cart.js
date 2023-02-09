export const ADD = 'cart/ADD'
export const REMOVE = 'cart/REMOVE'
export const SET_DONATION = 'cart/SET_DONATION'
export const REMOVE_ALL = 'cart/REMOVE_ALL'

export const createActionAdd = (animalData) => {
  return {
    type: ADD,
    payload: animalData
  }
}

export const createActionRemove = (animalId) => {
  return {
    type: REMOVE,
    payload: animalId
  }
}

export const createActionSetDonation = (animalData) => {
  return {
    type: SET_DONATION,
    payload: animalData
  }
}

export const createActionRemoveAll = () => ({
  type: REMOVE_ALL
})

export const initialState = []

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD:
      return [...state, action.payload]
    case REMOVE:
      return [...state.filter((animal) => animal.id !== action.payload)]
    case SET_DONATION:
      return [...state.map((animal) => animal.id === action.payload.id ? action.payload : animal)]
    case REMOVE_ALL:
      return initialState
    default:
      return state
  }
}

export default reducer
