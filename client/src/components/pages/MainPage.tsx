import React, { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { getTasksThunk } from '../../features/redux/actions/taskActions';
import TaskForm from '../UI/TaskForm';
import SingleTask from '../UI/SingleTask';
import ModalEdit from '../UI/ModalEdit';
import type { TaskType } from '../../types/taskTypes';

export default function MainPage(): JSX.Element {
  const tasks = useAppSelector((state) => state.tasks);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getTasksThunk());
  }, []);

  const [show, setShow] = useState(false);
  const [editingTask, setEditingTask] = useState<TaskType | null>(null);

  const handleClose = (): void => setShow(false);

  return (
    <Row style={{ textAlign: 'center' }}>
      <ModalEdit handleClose={handleClose} show={show} editingTask={editingTask} />
      <h1>All tasks</h1>
      <TaskForm />
      {tasks.map((task) => (
        <Container>
          <SingleTask key={task.id} task={task} setShow={setShow} setEditingTask={setEditingTask} />
        </Container>
      ))}
    </Row>
  );
}
