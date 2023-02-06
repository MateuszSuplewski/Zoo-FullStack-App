import axios from "axios";

class AuthAPI {
    constructor(API_URL){
        this.API_URL = API_URL
    }

    register = (accountDetails, path) => axios.post(this.API_URL + '/' + path, accountDetails)

    login = (accountDetails, path) => axios.post(this.API_URL + '/' + path, accountDetails )

    //fetchRole = (token, path) => axios.post(this.API_URL + '/' + path, token)

    fetchId = (token, path) => axios.post(this.API_URL + '/' + path, token)
}

export default AuthAPI