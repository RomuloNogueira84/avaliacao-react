import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button, Alert } from 'react-bootstrap';
import { addDoc, doc, updateDoc } from 'firebase/firestore';
import { tasksCollection, db } from '../../firebase';
import { useNavigate, useParams } from 'react-router-dom';
import { parseISO, isValid } from 'date-fns';
import Loading from '../UI/Loading';

const TaskForm = ({ editMode = false }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setErrorMsg] = useState(null);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();


  useEffect(() => {
    if (editMode && id) {
      setLoading(true)
      const fetchTask = async () => {
        try {
          const taskDoc = doc(db, 'tasks', id);
          const docSnap = await taskDoc.get()
          if (docSnap.exists()) {
            const taskData = docSnap.data()
            Object.keys(taskData).forEach(key => {
              if (key === 'dueDate') {
                if (taskData[key]) {
                  setValue(key, new Date(taskData[key]).toISOString().split('T')[0])
                }
              } else {
                setValue(key, taskData[key])
              }
            })
          } else {
            setErrorMsg("Tarefa não encontrada")
          }
        } catch (error) {
          setErrorMsg(error.message)
        } finally {
          setLoading(false)
        }
      }
      fetchTask()
    }
  }, [id, editMode, setValue, db])


  const onSubmit = async (data) => {
    setLoading(true);
    try {
      if (data.dueDate && !isValid(parseISO(data.dueDate))) {
        setErrorMsg('Data inválida.')
        return;
      }
      const taskData = { ...data, dueDate: data.dueDate ? new Date(data.dueDate).getTime() : null }
      if (editMode && id) {
        const taskDoc = doc(db, 'tasks', id);
        await updateDoc(taskDoc, taskData);
      } else {
        await addDoc(tasksCollection, taskData);
      }
      navigate('/');
    } catch (error) {
      setErrorMsg(error.message)
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form.Group className="mb-3">
        <Form.Label>Título</Form.Label>
        <Form.Control
          type="text"
          placeholder="Título da tarefa"
          {...register('title', { required: 'Título é obrigatório' })}
          isInvalid={errors.title}
        />
        <Form.Control.Feedback type="invalid">{errors.title?.message}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Descrição</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Descrição da tarefa"
          {...register('description')}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Data de Conclusão</Form.Label>
        <Form.Control type="date" {...register('dueDate')} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Status</Form.Label>
        <Form.Control as="select" {...register('status')}>
          <option value="pending">Pendente</option>
          <option value="completed">Concluída</option>
        </Form.Control>
      </Form.Group>

      <Button variant="primary" type="submit" disabled={loading}>
        {loading ? 'Loading...' : editMode ? 'Salvar Alterações' : 'Adicionar Tarefa'}
      </Button>
      {loading && <Loading />}
    </Form>
  );
};

export default TaskForm;