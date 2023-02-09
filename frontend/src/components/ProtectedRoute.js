import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
    const authState = useSelector((state) => state.auth)
    return authState.value && authState.value.token ? <Outlet/> : <Navigate to="/login"/>
}

export default ProtectedRoute