import React from 'react';
import { Card, Button } from 'react-bootstrap';

const UserCard = ({ username, role, email, onEdit, onDelete, onViewProfile, showViewProfile, isWorker }) => {
  const handleEdit = () => {
    // Llamar a la función onEdit según si es un trabajador o un usuario
    onEdit(isWorker);
  };

  return (
    <Card className="p-3 bg-primary text-light d-flex align-items-center justify-content-between">
      <div>
        <h5>{username}</h5>
        <p>{role}</p>
        <p>{email}</p>
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
