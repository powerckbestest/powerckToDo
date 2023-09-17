/* eslint-disable @typescript-eslint/default-param-last */
/* eslint-disable @typescript-eslint/no-unused-vars */

import type { Reducer } from '@reduxjs/toolkit';
import type { TaskActionsType, TaskType } from '../../../types/taskTypes';

const taskReducer: Reducer<TaskType[], TaskActionsType> = (state = [], action) => {
  switch (action.type) {
    case 'GET_TASKS':
      return action.payload;
    case 'ADD_TASK':
      return [action.payload, ...state];
    case 'EDIT_TASK':
      return state.map((task) => {
        if (task.id === action.payload.id) {
          return { ...task, value: action.payload.updatedTask };
        }
        return task;
      });
    case 'DELETE_TASK':
      return state.filter((task) => task.id !== action.payload);
    case 'SWITCH_TASK':
      return state.map((task) => {
        if (task.id === action.payload.taskId) {
          return { ...task, status: !task.status };
        }
        return task;
      });
    case 'DELETE_ALL_TASKS':
      return [];
    default:
      return state;
  }
};

export default taskReducer;
