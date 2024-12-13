import React from 'react';
import { Form } from 'react-bootstrap';

const TaskFilter = ({ onFilter }) => {
  const handleFilterChange = (event) => {
      const selectedFilter = event.target.value;
    onFilter(selectedFilter)
};
    return (
    <Form.Group>
        <Form.Label>Filtrar Tarefas:</Form.Label>
            <Form.Control as="select" onChange={handleFilterChange}>
                <option value="all">Todas</option>
                <option value="pending">Pendentes</option>
                <option value="completed">Concluídas</option>
            </Form.Control>
        </Form.Group>
    );
};

export default TaskFilter;