import {
  AnswerTask,
  CheckTask,
  CreateTask,
  Task,
  TrainingSimulatorShort,
  TrainingSimulatorVariant,
} from "@models";
import { api } from "../api";
import { startRefresh, enqueueRequest } from "../queue";
import { AxiosResponse } from "axios";

export const getTrainingSimulators = async (): Promise<
  AxiosResponse<TrainingSimulatorShort[]>
> => {
  if (!localStorage.getItem("accessToken")) {
    await startRefresh();
  }
  return enqueueRequest<TrainingSimulatorShort[]>(() =>
    api.get<TrainingSimulatorShort[]>(`/variants`),
  );
};

export const getTrainingSimulator = async (
  variant_id: string,
): Promise<AxiosResponse<TrainingSimulatorVariant>> => {
  if (!localStorage.getItem("accessToken")) {
    await startRefresh();
  }
  return enqueueRequest<TrainingSimulatorVariant>(() =>
    api.get<TrainingSimulatorVariant>(`/variants/${variant_id}`),
  );
};

export const createTaskTrainingSimulator = async (
  data: CreateTask,
): Promise<AxiosResponse<Task>> => {
  if (!localStorage.getItem("accessToken")) {
    await startRefresh();
  }
  return enqueueRequest<Task>(() => api.post<Task>(`/tasks`, data));
};

export const checkTaskTrainingSimulator = async (
  taskId: string,
  data: CheckTask,
): Promise<AxiosResponse<AnswerTask>> => {
  if (!localStorage.getItem("accessToken")) {
    await startRefresh();
  }
  return enqueueRequest<AnswerTask>(() =>
    api.post<AnswerTask>(`/tasks/${taskId}/check`, data),
  );
};
