import axios from "axios";

class OrdersAPI {
    constructor(API_URL){
        this.API_URL = API_URL
    }

    getByUser = (token, path) => axios.post(this.API_URL + '/' + path, token)

    create = (order) => axios.post(this.API_URL, order)

}

export default OrdersAPI