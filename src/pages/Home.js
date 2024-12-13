import React, { useState, useEffect, useContext } from 'react';
import TaskList from '../components/Tasks/TaskList';
import { tasksCollection } from '../firebase';
import { onSnapshot } from 'firebase/firestore';
import { AuthContext } from '../components/Auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/UI/Loading';
import ErrorMessage from '../components/UI/ErrorMessage';
import { Container, Row, Col } from 'react-bootstrap';
import TaskFilter from '../components/Tasks/TaskFilter';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null)
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    if (!currentUser) {
      navigate('/login')
      return
    }
    const unsubscribe = onSnapshot(tasksCollection, (snapshot) => {
      try {
        const taskList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        setTasks(taskList);
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    });
    return () => unsubscribe();
  }, [currentUser, navigate]);


  const filteredTasks = () => {
    if (filter === 'all') {
      return tasks;
    }
    return tasks.filter(task => task.status === filter)
  }
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter)
  }

  if (loading) {
    return <Loading />
  }
  if (error) {
    return <ErrorMessage message={error} />
  }
  return (
    <Container>
      <Row>
        <Col>
          <TaskFilter onFilter={handleFilterChange} />
        </Col>
      </Row>
      <TaskList tasks={filteredTasks()} />
    </Container>
  );
};

export default Home;