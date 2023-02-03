import AnimalsAPI from '../api/animalsProvider'

const api = new AnimalsAPI('http://localhost:8080/api/v1/animals')

export const GET_ALL = 'animals/GET_ALL'
export const GET = 'animals/GET'
export const ADD = 'animals/ADD'
export const UPDATE = 'animals/UPDATE'
export const DELETE = 'animals/DELETE'
export const ERROR = 'animals/ERROR'
export const START = 'animals/START'
export const STOP = 'animals/STOP'

export const createActionGetAll = () => async (dispatch, getState) => {
  dispatch(createActionStart())
  api
    .fetchAll()
    .then((resp) => {
      dispatch({
        type: GET_ALL,
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

export const createActionGet = (animalId) => async (dispatch, getState) => {
  dispatch(createActionStart())
  api
    .fetchById(animalId)
    .then((resp) => {
      dispatch({
        type: GET,
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

export const createActionAdd = (animalData) => async (dispatch, getState) => {
  api
    .create(animalData)
    .then((resp) => {
      dispatch({
        type: ADD,
        payload: resp.data,
      })
    })
    .catch((err) => {
      dispatch({
        type: ERROR,
        payload: err.message,
      })
    })
}

export const createActionUpdate =
  (animalId, animalData) => async (dispatch, getState) => {
    api
      .update(animalId, animalData)
      .then((resp) => {
        dispatch({
          type: UPDATE,
          payload: resp.data,
        })
      })
      .catch((err) => {
        dispatch({
          type: ERROR,
          payload: err.message,
        })
      })
  }

export const createActionDelete = (animalId) => async (dispatch, getState) => {
  api
    .delete(animalId)
    .then((resp) => {
      dispatch({
        type: DELETE,
        payload: resp.data,
      })
    })
    .catch((err) => {
      dispatch({
        type: ERROR,
        payload: err.message,
      })
    })
}

const createActionStart = () => ({
  type: START,
})

const createActionStop = () => ({
  type: STOP,
})

export const initialState = {
  value: null,
  currentAnimal: null,
  loading: false,
  error: null,
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL:
      return {
        ...state,
        value: [...action.payload],
      }
    case GET:
      return {
        ...state,
        currentAnimal: action.payload,
      }
    case ADD:
      return {
        ...state,
        value: [...state.value, action.payload],
      }
    case UPDATE:
      return {
        ...state,
        value: state.value.map((animal) =>
          animal.animalId === action.payload.animalId ? action.payload : animal
        ),
      }
    case DELETE:
      return {
        ...state,
        value: state.value.filter(
          (animal) => animal.animalId !== action.payload.animalId
        ),
      }
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
        error: initialState.error,
        currentAnimal: initialState.currentAnimal
      }
    case STOP:
      return {
        ...state,
        loading: initialState.loading,
      }
    default:
      return state
  }
}

export default reducer
