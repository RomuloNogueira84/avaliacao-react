import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Alert } from 'react-bootstrap';

const Login = () => {
  const { register, handleSubmit, setError, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false)
  const [error, setErrorMsg] = useState(null)

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      navigate('/');
    } catch (error) {
      setErrorMsg(error.message)
      setError('email', {
        type: 'manual',
        message: error.message
      });
    } finally {
      setLoading(false)
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate('/');
    } catch (error) {
      setErrorMsg(error.message)
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" {...register('email', { required: 'Email is required' })} isInvalid={errors.email} />
        <Form.Control.Feedback type="invalid">{errors.email?.message}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" {...register('password', { required: 'Password is required' })} isInvalid={errors.password} />
        <Form.Control.Feedback type="invalid">{errors.password?.message}</Form.Control.Feedback>
      </Form.Group>
      <Button variant="primary" type="submit" disabled={loading}>
        {loading ? 'Loading...' : 'Login'}
      </Button>
      <Button variant="danger" className="ms-2" onClick={handleGoogleSignIn} disabled={loading}>
        Login com Google
      </Button>
    </Form>
  );
};

export default Login;