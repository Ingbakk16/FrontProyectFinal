import React, { useContext } from 'react';
import { Navbar, Form, FormControl, Button, Container } from 'react-bootstrap';
import { AuthenticationContext } from '../services/authenticationContext/authentication.context';
import { useNavigate } from "react-router-dom";
import './buttons.css';

const Header = () => {
  const { handleLogout } = useContext(AuthenticationContext);
  const navigate = useNavigate();

  const profileHandler = () => navigate("/profile");
  const categoriesHandler = () => navigate("/categories");
  const settingsHandler = () => navigate("/settings");
  const helpHandler = () => navigate("/help");

  return (
    <div >
      {/* Header Navbar */}
      <Navbar expand="lg" className="p-3" style={{ backgroundColor:'#25206A' }}>
        <Container fluid className="justify-content-between">
          {/* Logout Button */}
          <Button 
            variant="outline-primary" 
            className="rounded-circle border-0 p-2 shadow-none" 
            onClick={handleLogout} 
            >
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
              <path fill="currentColor" d="M4 18h2v2h12V4H6v2H4V3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1zm2-7h7v2H6v3l-5-4l5-4z"/>
            </svg>
          </Button>

          {/* Search Form */}
          <Form className="d-flex mx-auto my-2" style={{ width: '30%' }}>
            <FormControl 
              type="text" 
              placeholder="Buscar" 
              className="me-2" 
              aria-label="Buscar" />
          </Form>
        </Container>
      </Navbar>

      {/* Row of Buttons under the Header */}
      <div >
        <Container className="d-flex justify-content-center">
          {/* Categories Button */}
          <Button 
           
            className="mx-2 headers-buttons" 
            onClick={categoriesHandler}>
            <svg xmlns="http://www.w3.org/2000/svg" width="10em" height="2em" viewBox="0 0 24 24">
              <path fill="currentColor" d="M3 4h4v4H3zm0 6h4v4H3zm0 6h4v4H3zm6-12h12v4H9zm0 6h12v4H9zm0 6h12v4H9z"/>
            </svg>
          </Button>

          {/* Profile Button */}
          <Button 
            
            className="mx-2 headers-buttons" 
            onClick={profileHandler}>
            <svg xmlns="http://www.w3.org/2000/svg" width="10em" height="2em" viewBox="0 0 48 48">
              <g fill="currentColor">
                <path d="M32 20a8 8 0 1 1-16 0a8 8 0 0 1 16 0"/>
                <path fillRule="evenodd" d="M23.184 43.984C12.517 43.556 4 34.772 4 24C4 12.954 12.954 4 24 4s20 8.954 20 20s-8.954 20-20 20h-.274q-.272 0-.542-.016M11.166 36.62a3.028 3.028 0 0 1 2.523-4.005c7.796-.863 12.874-.785 20.632.018a2.99 2.99 0 0 1 2.498 4.002A17.94 17.94 0 0 0 42 24c0-9.941-8.059-18-18-18S6 14.059 6 24c0 4.916 1.971 9.373 5.166 12.621" clipRule="evenodd"/>
              </g>
            </svg>
          </Button>

          {/* Settings Button */}
          <Button 
            variant="outline-primary" 
            className="mx-2 headers-buttons" 
            onClick={settingsHandler}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" >
            <path d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z"/>
            </svg>
          </Button>


          {/* Help Button */}
          <Button 
            variant="outline-primary" 
            className="mx-2 headers-buttons" 
            onClick={helpHandler}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="9em" height="2em" viewBox="0 0 24 24">
              <path fill="currentColor" d="M12 2a10 10 0 0 1 10 10a10 10 0 1 1-20 0a10 10 0 0 1 10-10zM7.893 8.8c.178 1.248 1.288 1.552 2.236 1.552c.984 0 2.207-.453 2.207 1.012c0 1.012-.984 1.21-1.804 1.806c-.715.482-.97 1.179-.852 1.936l.029.453h1.754l-.03-.39c-.12-.937.178-1.162.937-1.65c.773-.484 1.788-1.057 1.788-2.407c0-1.695-1.407-2.342-3.07-2.342c-.568 0-1.702.106-1.872 1.07h1.154zm2.113 6.54a1.05 1.05 0 0 0-1.178 1.048c0 .615.452 1.093 1.178 1.093c.74 0 1.178-.5 1.178-1.093c0-.615-.484-1.048-1.178-1.048z"/>
            </svg>
          </Button>

        </Container>
      </div>
    </div>
  );
};

export default Header;