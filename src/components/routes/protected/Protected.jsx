import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";

import { AuthenticationContext } from "../../services/authenticationContext/authentication.context";

const Protected = ({ allowedRoles }) => {
    const { token, role, loading } = useContext(AuthenticationContext);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    if (!allowedRoles.includes(role)) {
        return <Navigate to="/unauthorized" replace />;
    }

   

    return <Outlet />;
};

Protected.propTypes = {
    allowedRoles: PropTypes.array.isRequired,
};

export default Protected;
