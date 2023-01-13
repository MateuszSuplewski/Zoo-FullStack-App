import axios from 'axios'

class AuthAPI {
    constructor (API_URL) {
      this.API_URL = API_URL
    }
  
      validateAccount = async (data, additionalPath = '') => {
        const fullUrl = this.API_URL + additionalPath
        
        try {
            const response = await axios.post(fullUrl, data)
            const responseData = await response.data
            return responseData
        } catch (error) {
            throw error.message
        }
      };
  }
  
  export default AuthAPI