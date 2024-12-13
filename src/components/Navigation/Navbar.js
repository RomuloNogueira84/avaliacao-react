import React, { useContext } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Logout from '../Auth/Logout';
import { AuthContext } from '../Auth/AuthContext';

const NavBar = () => {
  const { currentUser } = useContext(AuthContext)

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Gerenciador de Tarefas</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {currentUser && (
              <>
                <Nav.Link as={Link} to="/">Tarefas</Nav.Link>
                <Nav.Link as={Link} to="/add">Adicionar Tarefa</Nav.Link>
              </>
            )}
          </Nav>
          <Nav>
            {currentUser ? (
              <Logout />
            ) : (
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navbar;