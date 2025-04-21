import { Navigate, Outlet } from "react-router-dom"

const ProRoute = ({state}) => {
        return state ? <Outlet /> : <Navigate to="/login" />;
    }

export default ProRoute;