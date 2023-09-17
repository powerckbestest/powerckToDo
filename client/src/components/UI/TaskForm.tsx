import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { addTaskThunk } from '../../features/redux/actions/taskActions';
import type{ TaskFormCreateType } from '../../types/taskTypes';

export default function TaskForm(): JSX.Element {
  const dispatch = useAppDispatch()
  return (
    <Form onSubmit={(e: React.FormEvent<HTMLFormElement & TaskFormCreateType>) => dispatch(addTaskThunk(e))} style={{textAlign: 'center'}}>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Add task</Form.Label>
      <Form.Control name='value' type="text" placeholder="Task value" />
    </Form.Group>
    <Button style={{marginBottom: '16px'}} variant="primary" type="submit">
      Add
    </Button>
  </Form>
  )
}
