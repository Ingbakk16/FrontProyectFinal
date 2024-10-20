import React from 'react';
import { Card, Button } from 'react-bootstrap';

const CategoryCard = ({ categoryName, onEdit, onDelete }) => {
  return (
    <Card className="p-3 bg-primary text-light d-flex align-items-center justify-content-between">
      <div>
        <h5>{categoryName}</h5>
      </div>
      <div className="d-flex">
        <Button variant="outline-light" className="mx-2" onClick={onEdit}>
          Editar
        </Button>
        <Button variant="outline-light" className="mx-2" onClick={onDelete}>
          Borrar
        </Button>
      </div>
    </Card>
  );
};

export default CategoryCard;
