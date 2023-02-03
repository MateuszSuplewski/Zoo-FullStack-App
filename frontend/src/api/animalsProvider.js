import axios from "axios";

class AnimalsAPI {
    constructor(API_URL){
        this.API_URL = API_URL
    }

    fetchAll = () => axios.get(this.API_URL)

    fetchById = id => axios.get(this.API_URL + '/' + id)

    create = data => axios.post(this.API_URL, data)

    update = (id, data) => axios.put(this.API_URL + '/' + id, data)

    delete = id => axios.delete(this.API_URL + '/' + id)
}

export default AnimalsAPI
