import React from 'react';
import TaskForm from '../components/Tasks/TaskForm';
import { Container } from 'react-bootstrap'

const AddTask = () => {
  return (
    <Container>
      <h2>Adicionar Tarefa</h2>
      <TaskForm />
    </Container>
  );
};

export default AddTask;