import {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'


const useRole = (url) => {

    const [userRole, setUserRole] = useState()
    const [error, setError] = useState()
    const authState = useSelector((state) => state.auth)



    const getUserRole = async () => {
        try {
            const response = await axios.post(url, authState.value.token)
            setUserRole(response.data)
        } catch (err) {
          setError(err.message)
        }
    }

    useEffect(() => {
        if (authState.value && authState.value.token) getUserRole()
      },[])

  return [userRole, error]
}

export default useRole
