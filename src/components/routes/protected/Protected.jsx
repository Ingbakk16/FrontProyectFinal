import { Navigate, Outlet } from "react-router-dom";

const Protected = ({ isSignedIn }) => {
    if (!isSignedIn)
        return <Navigate to="/login" />;

    return <Outlet />;

};

export default Protected;
