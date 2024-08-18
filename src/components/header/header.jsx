// src/components/Header.js
import React from 'react';
import { Navbar, Form, FormControl, Button } from 'react-bootstrap';

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark" className="justify-content-between p-3">
      <Button variant="outline-light" className="rounded-circle">
        {/* Back Button Icon */}
        <i className="bi bi-arrow-left"></i>
      </Button>
      <Form inline>
        <FormControl type="text" placeholder="buscar" className="mr-sm-2" />
      </Form>
      <Button variant="outline-light" className="rounded-circle">
        {/* Profile Icon */}
        <i className="bi bi-person"></i>
      </Button>
    </Navbar>
  );
};

export default Header;
