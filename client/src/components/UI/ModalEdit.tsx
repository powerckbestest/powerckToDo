import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import type { TaskFormCreateType, TaskType } from '../../types/taskTypes';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { editTaskThunk } from '../../features/redux/actions/taskActions';

type ModalProps = {
  handleClose: () => void;
  show: boolean;
  editingTask: TaskType;
};
export default function ModalEdit({ handleClose, show, editingTask }: ModalProps): JSX.Element {
  const dispatch = useAppDispatch();
  return (
    <Modal style={{ textAlign: 'center' }} show={show} onHide={handleClose}>
      <Form
        onSubmit={(e: React.FormEvent<HTMLFormElement & TaskFormCreateType>) => {
          handleClose();
          dispatch(editTaskThunk(e, editingTask?.id));
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Form.Group className="m-4" controlId="formBasicEmail">
          <Form.Label>Type down below</Form.Label>
          <Form.Control name="value" type="text" placeholder="Edit" />
        </Form.Group>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
