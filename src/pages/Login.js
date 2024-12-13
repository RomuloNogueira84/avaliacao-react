import React from 'react';
import Login from '../components/Auth/Login';
import { Container } from 'react-bootstrap'

const LoginPage = () => {
  return (
    <Container>
      <h2>Login</h2>
      <Login />
    </Container>
  );
};

export default LoginPage;