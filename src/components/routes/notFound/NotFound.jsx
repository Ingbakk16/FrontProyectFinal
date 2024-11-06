import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();

    const goBackMainHandler = () => {
        navigate("/mainPage");
    };
    return (
        <div className="text-center mt-3">
            <h2>¡Ups!La página solicitada no fue encontrada</h2>
            <Button classname="text-center" onClick={goBackMainHandler}>Volver a la pagina principal</Button>
        </div>
    );
};

export default NotFound;