import { useState, useReducer } from 'react'

const useForm = (validationFn, formFields, onSubmit) => {
  const prepareState = () => {
    const state = {}
    formFields.forEach(({ name, type }) => (state[name] = type === 'number' ? 0 : ''))
    return state
  }

  const initialState = prepareState()

  const reducer = (state, action) => {
    switch (action.type) {
      case 'updateFieldValue':
        return {
          ...state,
          [action.payload.key]: action.payload.value
        }
      case 'clearFields':
        return {
          ...initialState
        }
      case 'setState':
        return {
          ...state,
          ...action.payload
        }
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)
  const [errors, setErrors] = useState([])

  const handleInputChange = ({ target }, type) => {
    dispatch({
      type: 'updateFieldValue',
      payload: {
        key: target.name,
        value: type === 'number' ? Number(target.value) : target.value,
      },
    })
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()

    const validationErrors = validationFn(formFields, state)

    if (Object.keys(validationErrors).length !== 0) {
      setErrors(validationErrors)
      return
    }

    onSubmit(state)
    dispatch({ type: 'clearFields' })
    setErrors(validationErrors)
  }

  const handleSetState = (newState) => {
    dispatch({
      type: 'setState',
      payload: newState
    })
  }

  return [handleInputChange, handleFormSubmit, state, errors, handleSetState]
}

export default useForm
