import React from 'react';
import TaskForm from '../components/Tasks/TaskForm';
import { Container } from 'react-bootstrap'
const EditTask = () => {
  return (
    <Container>
      <h2>Editar Tarefa</h2>
      <TaskForm editMode={true} />
    </Container>
  );
};

export default EditTask;