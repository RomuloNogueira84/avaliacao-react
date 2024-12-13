import React from 'react';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import { Button } from 'react-bootstrap';

const Logout = () => {
const handleLogout = async () => {
    try {
    await signOut(auth);
    } catch (error) {
    console.error('Error logging out:', error);
    }
};

return (
    <Button variant="secondary" onClick={handleLogout}>Logout</Button>
);
};

export default Logout;