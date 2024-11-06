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

    // Puedes mantener o eliminar estos logs según tu necesidad de depuración
    console.log("Token:", token);
    console.log("Role:", role); 
    console.log("Allowed roles:", allowedRoles);
    console.log("Current role:", role);
    console.log("Role included in allowedRoles:", allowedRoles.includes(role));

    return <Outlet />;
};

Protected.propTypes = {
    allowedRoles: PropTypes.array.isRequired,
};

export default Protected;
