    import React from 'react';
    import TaskItem from './TaskItem';
    import { ListGroup } from 'react-bootstrap';

    const TaskList = ({ tasks }) => {
    return (
        <ListGroup>
        {tasks.map((task) => (
            <TaskItem key={task.id} task={task} />
        ))}
        </ListGroup>
    );
    };

    export default TaskList;