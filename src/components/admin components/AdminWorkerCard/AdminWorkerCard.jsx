import React from "react";
import { Card, Button } from "react-bootstrap";

const UserCard = ({
  username,
  name,
  lastname,
  email,
  onEdit,
  onDelete,
  onViewProfile,
  onViewReviews,
  showViewProfile,
  showDeleteReviews,
  isWorker,
}) => {
  return (
    <Card className="p-3 bg-primary text-light d-flex align-items-center justify-content-between">
      <div>
        <h5>{`${name} ${lastname}`}</h5>
        <p>Username: {username}</p>
        <p>Email: {email}</p>
      </div>
      <div className="d-flex">
        <Button variant="outline-light" className="mx-2" onClick={onEdit}>
          Editar
        </Button>
        {showViewProfile && (
          <Button variant="outline-light" className="mx-2" onClick={onViewProfile}>
            Ver Perfil
          </Button>
        )}
        {showDeleteReviews && (
          <Button variant="outline-light" className="mx-2" onClick={onViewReviews}>
            Delete Reviews
          </Button>
        )}
        <Button variant="outline-danger" className="mx-2" onClick={onDelete}>
          Eliminar
        </Button>
      </div>
    </Card>
  );
};

export default UserCard;
