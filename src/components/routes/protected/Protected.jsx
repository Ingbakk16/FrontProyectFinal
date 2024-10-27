import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { AuthenticationContext } from "../../services/authenticationContext/authentication.context";

const Protected = () => {
    const { token } = useContext(AuthenticationContext);

    if (!token)
        return <Navigate to = "/login"/>;

    return <Outlet/>;

};

export default Protected;

