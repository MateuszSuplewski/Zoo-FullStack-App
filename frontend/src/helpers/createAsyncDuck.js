export const createAsyncDuck = (duckName, asyncFn) => {
    const SET = `${duckName}/SET`
    const START = `${duckName}/START`
    const STOP = `${duckName}/STOP`
    const ERROR = `${duckName}/ERROR`
  
    const createActionAsync = (...params) => async (dispatch, getState) => {
      dispatch(createActionStart())
      try {
        const data = await asyncFn(...params)
        dispatch(createActionSet(data))
      } catch (error) {
        dispatch(createActionError(error))
      }
      dispatch(createActionStop())
    }
  
    const createActionSet = (data) => ({
      type: SET,
      payload: data
    })
  
    const createActionStart = () => ({
      type: START
    })
  
    const createActionStop = () => ({
      type: STOP
    })
  
    const createActionError = (error) => ({
      type: ERROR,
      payload: error
    })
  
    const selector = (state) => state[duckName]
  
    const initialState = {
      value: null,
      loading: false,
      error: null
    }
  
    const reducer = (state = initialState, action) => {
      switch (action.type) {
        case SET:
          return {
            ...state,
            value: action.payload
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
        case ERROR:
          return {
            ...state,
            error: action.payload
          }
        default:
          return state
      }
    }
  
    return {
      actionTypes: {
        SET,
        START,
        STOP,
        ERROR
      },
      actionCreators: {
        set: createActionSet,
        start: createActionStart,
        stop: createActionStop,
        error: createActionError,
        [duckName]: createActionAsync
      },
      reducer,
      selector
    }
  }