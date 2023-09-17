/* eslint-disable import/prefer-default-export */
import type { TaskFormCreateType, TaskType } from '../types/taskTypes';
import apiClient from './apiConfig';

export const getTasksFromDb = (): Promise<TaskType[]> =>
  apiClient
    .get<TaskType[]>('/tasks')
    .then(({ data }) => data)
    .catch((err) => Promise.reject(err));

export const addTaskToDb = (formData: TaskFormCreateType): Promise<TaskType> =>
  apiClient
    .post<TaskType>('/tasks', formData)
    .then(({ data }) => data)
    .catch((err) => Promise.reject(err));

export const deleteTaskFromDb = (id: number): Promise<void> =>
  apiClient
    .delete(`/tasks/${id}`)
    .then((data) => console.log(data))
    .catch((err) => console.log(err));

export const switchTaskInDb = (id: number): Promise<void> =>
  apiClient
    .patch(`/tasks/status/${id}`)
    .then((data) => console.log(data))
    .catch((err) => console.log(err));

export const editTaskInDb = (id: number, formData: TaskFormCreateType): Promise<TaskType> =>
  apiClient
    .patch<TaskType>(`tasks/${id}`, formData)
    .then(({ data }) => data)
    .catch((err) => Promise.reject(err));
