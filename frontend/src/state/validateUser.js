import { createAsyncDuck } from '../helpers/createAsyncDuck'
import AuthAPI from '../api/authProvider'

const api = new AuthAPI('http://localhost:8080/api/v1/auth')

export const { actionTypes, actionCreators, reducer, selector } = createAsyncDuck('validateUser', api.validateAccount)

export default reducer