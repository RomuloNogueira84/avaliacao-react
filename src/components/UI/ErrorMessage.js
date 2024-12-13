    import React from 'react';
    import { Alert } from 'react-bootstrap';

    const ErrorMessage = ({ message }) => {
    return (
        <Alert variant="danger">
            {message}
        </Alert>
    );
    };

    export default ErrorMessage;