import axios from 'axios'

export const GET = 'animals/GET'
export const ADD = 'animals/ADD'
export const UPDATE = 'animals/UPDATE'
export const DELETE = 'animals/DELETE'
export const ERROR = 'animals/ERROR'

export const createActionGet = () => async (dispatch, getState) => {
  try {
    const response = await axios.get('http://localhost:8080/api/v1/animals')
    dispatch({
      type: GET,
      payload: response.data,
    })
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: error.message,
    })
  }
}

export const createActionAdd = (animalData) => async (dispatch, getState) => {
  try {
    await axios.post('http://localhost:8080/api/v1/animals', animalData)
    dispatch({
      type: ADD,
    })
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: error.message,
    })
  }
}

export const createActionUpdate =
  (animalId, animalData) => async (dispatch, getState) => {
    try {
      await axios.put(
        `http://localhost:8080/api/v1/animals/${animalId}`,
        animalData
      )
      dispatch({
        type: UPDATE,
      })
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error.message,
      })
    }
  }

export const createActionDelete = (animalId) => async (dispatch, getState) => {
  try {
    await axios.delete(`http://localhost:8080/api/v1/animals/${animalId}`)
    dispatch({
      type: DELETE,
    })
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: error.message,
    })
  }
}

export const initialState = {
  value: null,
  error: null,
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET:
      return {
        ...state,
        value: [...action.payload],
      }
    case ADD:
      return state
    case UPDATE:
      return state
    case DELETE:
      return state
    default:
      return state
  }
}

export default reducer
