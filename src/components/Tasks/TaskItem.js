import React from 'react';
import { ListGroup, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { format } from 'date-fns';

const TaskItem = ({ task }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/edit/${task.id}`);
  };

  const handleDelete = async () => {
    try {
      const taskDoc = doc(db, 'tasks', task.id);
      await deleteDoc(taskDoc);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleStatusChange = async (newStatus) => {
    try {
      const taskDoc = doc(db, 'tasks', task.id);
      await updateDoc(taskDoc, { status: newStatus });
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  }

  const dateFormated = task.dueDate ? format(new Date(task.dueDate), 'dd/MM/yyyy') : 'Sem data'

  return (
    <ListGroup.Item>
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h5>{task.title}</h5>
          <p>{task.description}</p>
          <p>Data de Conclusão: {dateFormated}</p>
        </div>
        <div>
          <span className="me-2">Status: </span>
          <select
            value={task.status}
            onChange={(e) => handleStatusChange(e.target.value)}
          >
            <option value="pending">Pendente</option>
            <option value="completed">Concluída</option>
          </select>
          <Button variant="primary" onClick={handleEdit} className="ms-2">
            Editar
          </Button>
          <Button variant="danger" onClick={handleDelete} className="ms-2">
            Excluir
          </Button>
        </div>
      </div>
    </ListGroup.Item>
  );
};

export default TaskItem;