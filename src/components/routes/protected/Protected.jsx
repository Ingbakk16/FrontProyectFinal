import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { AuthenticationContext } from "../../services/authenticationContext/authentication.context";

const Protected = () => {
    const { user } = useContext(AuthenticationContext);

    if (!user)
        return <Navigate to="/login"/>;

    return <Outlet/>;

};

export default Protected;

