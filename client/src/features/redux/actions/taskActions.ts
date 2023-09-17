import {
  addTaskToDb,
  deleteTaskFromDb,
  editTaskInDb,
  getTasksFromDb,
  switchTaskInDb,
} from '../../../services/taskService';
import type { AppThunk } from '../../../types/reduxThunkType';
import type {
  AddTaskAction,
  DeleteAllTasksAction,
  DeleteTaskAction,
  EditTaskAction,
  GetTasksAction,
  SwitchTaskAction,
  TaskFormCreateType,
  TaskType,
} from '../../../types/taskTypes';

export const getTasks = (payload: TaskType[]): GetTasksAction => ({
  type: 'GET_TASKS',
  payload,
});

export const addTask = (payload: TaskType): AddTaskAction => ({
  type: 'ADD_TASK',
  payload,
});

export const deleteTask = (payload: number): DeleteTaskAction => ({
  type: 'DELETE_TASK',
  payload,
});

export const editTask = (payload: { id: number | null; updatedTask: string }): EditTaskAction => ({
  type: 'EDIT_TASK',
  payload,
});

export const switchTask = (payload: { taskId: number; status: boolean }): SwitchTaskAction => ({
  type: 'SWITCH_TASK',
  payload,
});

export const deleteAllTasks = (): DeleteAllTasksAction => ({
  type: 'DELETE_ALL_TASKS',
});

export const getTasksThunk = (): AppThunk => (dispatch) => {
  getTasksFromDb()
    .then((data) => dispatch(getTasks(data)))
    .catch((err) => console.log(err));
};

export const addTaskThunk =
  (e: React.FormEvent<HTMLFormElement & TaskFormCreateType>): AppThunk =>
  (dispatch) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const value = formData.get('value') as string;
    const data = {
      value,
    };
    e.currentTarget.reset();
    addTaskToDb(data)
      .then((dataFromServ) => dispatch(addTask(dataFromServ)))
      .catch((err) => console.log(err));
  };

export const editTaskThunk =
  (e: React.FormEvent<HTMLFormElement & TaskFormCreateType>, id: number): AppThunk =>
  (dispatch) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const value = formData.get('value') as string;
    const data = {
      value,
    };
    editTaskInDb(id, data)
    .then(() => {
      const payload = {id, updatedTask: data.value}
      dispatch(editTask(payload))
    })
    .catch(err => console.log(err))
  };

export const deleteTaskThunk =
  (id: number): AppThunk =>
  (dispatch) => {
    deleteTaskFromDb(id)
      .then(() => dispatch(deleteTask(id)))
      .catch((err) => console.log(err));
  };

export const switchTaskThunk =
  (id: number, status: boolean): AppThunk =>
  (dispatch) => {
    switchTaskInDb(id)
      .then(() => {
        const payload = { taskId: id, status };
        dispatch(switchTask(payload));
      })
      .catch((err) => console.log(err));
  };
