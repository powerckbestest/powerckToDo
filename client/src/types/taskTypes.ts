export type TaskType = {
  id: number;
  status: boolean;
  value: string;
};

export type GetTasksAction = {
  type: 'GET_TASKS';
  payload: TaskType[];
};

export type AddTaskAction = {
  type: 'ADD_TASK'
  payload: TaskType
}

export type DeleteTaskAction = {
  type: 'DELETE_TASK'
  payload: number
}

export type EditTaskAction = {
  type: 'EDIT_TASK'
  payload: {
    id:number
    updatedTask: string
  }
}

export type DeleteAllTasksAction = {
  type: 'DELETE_ALL_TASKS'
}

export type TaskFormCreateType = {
  value: HTMLInputElement
}