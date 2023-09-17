import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import type { TaskType } from '../../types/taskTypes';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { deleteTaskThunk, switchTaskThunk } from '../../features/redux/actions/taskActions';

type TaskProps = {
  task: TaskType;
  setEditingTask: (task: TaskType) => void;
  setShow: (value: boolean) => void;
};

export default function SingleTask({ task, setEditingTask, setShow }: TaskProps): JSX.Element {
  const dispatch = useAppDispatch();
  return (
    <Card
      style={{
        width: '80rem',
        height: '12rem',
        textAlign: 'center',
        backgroundColor: task.status === true ? 'lightgreen' : 'lightpink',
      }}
    >
      <Card.Body>
        <Card.Title>Task: {task.value}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          Status: {task.status === false ? 'Not Done yet' : 'Done'}
        </Card.Subtitle>
        <Form.Check // prettier-ignore
          type="switch"
          checked={task.status === true}
          onClick={() => dispatch(switchTaskThunk(task.id, task.status))}
          id="custom-switch"
        />
        <Button
          style={{ marginTop: '24px' }}
          onClick={() => {
            setShow(true);
            setEditingTask(task);
          }}
          variant="warning"
        >
          Edit
        </Button>{' '}
        <Button
          style={{ marginTop: '24px' }}
          onClick={() => dispatch(deleteTaskThunk(task.id))}
          variant="danger"
        >
          Delete
        </Button>{' '}
      </Card.Body>
    </Card>
  );
}
