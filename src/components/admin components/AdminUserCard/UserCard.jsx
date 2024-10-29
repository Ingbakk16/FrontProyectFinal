import React from 'react';
import { Card, Button } from 'react-bootstrap';

const UserCard = ({ username, name, lastname, role, email, onEdit, onDelete, onViewProfile, showViewProfile, isWorker }) => {
  const handleEdit = () => {
    onEdit(isWorker);
  };

  return (
    <Card className="p-3 bg-primary text-light d-flex align-items-center justify-content-between">
      <div>
        <h5>{`${name} ${lastname}`}</h5> {/* Mostrar nombre completo */}
        <p>Username: {username}</p>        {/* Mostrar el username */}
        <p>Role: {role || "Worker"}</p>    {/* Mostrar el rol del usuario */}
        <p>Email: {email}</p>              {/* Mostrar el correo */}
      </div>
      <div className="d-flex">
        <Button variant="outline-light" className="mx-2" onClick={handleEdit}>
          Edit
        </Button>
        {showViewProfile && (
          <Button variant="outline-light" className="mx-2" onClick={onViewProfile}>
            View Profile
          </Button>
        )}
        <Button variant="outline-light" className="mx-2" onClick={onDelete}>
          Delete
        </Button>
      </div>
    </Card>
  );
};

export default UserCard;
