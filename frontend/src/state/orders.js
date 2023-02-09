import OrdersAPI from '../api/ordersProvider'

const api = new OrdersAPI('http://localhost:8080/api/v1/orders')

export const GET = 'orders/GET_BY_USER'
export const ADD = 'orders/ADD'
export const ERROR = 'orders/ERROR'
export const START = 'orders/START'
export const STOP = 'orders/STOP'

export const createActionGetByUser = (token) => async (dispatch, getState) => {
  dispatch(createActionStart())
  api
    .getByUser(token, 'user')
    .then((resp) => {
      const ordersData = resp.data.map((order) => ({
        ...order,
        user: order.user.id,
        orderedAt: order.orderedAt.slice(0, 10)
      }))

      dispatch({
        type: GET,
        payload: ordersData
      })
    })
    .catch((err) => {
      dispatch({
        type: ERROR,
        payload: err.message
      })
    })
    .finally(() => dispatch(createActionStop()))
}

export const createActionAdd = (order) => async (dispatch, getState) => {
  dispatch(createActionStart())
  api
    .create(order)
    .then((resp) => {
      const protectedOrder = {
        ...order,
        user: order.user.id,
        orderedAt: order.orderedAt.slice(0, 10)
      }

      dispatch({
        type: ADD,
        payload: protectedOrder
      })
    })
    .catch((err) => {
      dispatch({
        type: ERROR,
        payload: err.message
      })
    })
    .finally(() => dispatch(createActionStop()))
}

const createActionStart = () => ({
  type: START
})

const createActionStop = () => ({
  type: STOP
})

export const initialState = {
  value: null,
  loading: false,
  error: null
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD:
      return {
        ...state,
        value: [...state.value, action.payload]
      }
    case GET:
      return {
        ...state,
        value: [...action.payload]
      }
    case ERROR:
      return {
        ...state,
        error: action.payload
      }
    case START:
      return {
        ...state,
        loading: true,
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
