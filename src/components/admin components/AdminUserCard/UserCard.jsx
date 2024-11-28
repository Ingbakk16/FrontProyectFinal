import React from "react";
import { Card, Button } from "react-bootstrap";
import AdminConfirmationAlert from "../../ConfirmationAlert/ConfirmationAlert";

const UserCard = ({
  username,
  name,
  lastname,
  email,
  onEdit,
  onDelete,
  onBecomeWorker,
}) => {
  const handleDeleteClick = () => {
    AdminConfirmationAlert({
      title: "Confirm deletion",
      text: "Are you sure you want to delete this user?",
      onConfirm: onDelete, 
    });
  };

  return (
    <Card className="p-3 bg-primary text-light d-flex align-items-center justify-content-between">
      <div>
        <h5>{`${name} ${lastname}`}</h5>
        <p>Username: {username}</p>
        <p>Email: {email}</p>
      </div>
      <div className="d-flex">
        <Button variant="outline-light" className="mx-2" onClick={onEdit}>
          Edit
        </Button>
        <Button variant="outline-light" className="mx-2" onClick={onBecomeWorker}>
          Make Worker
        </Button>
        <Button variant="outline-danger" className="mx-2" onClick={handleDeleteClick}>
          Delete
        </Button>
      </div>
    </Card>
  );
};

export default UserCard;
