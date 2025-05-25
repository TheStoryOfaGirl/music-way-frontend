import {
  ActiveHomeworkInfo,
  HomeworkShort,
  CompletedHomeworkStudent,
  HomeworkTeacher,
  UpdateHomeworkTeacher,
  TrainingSimulatorShort,
  CreateHomework,
  CheckHomework,
} from "@models";
import { api } from "./../../api/api.ts";
import { enqueueRequest, startRefresh } from "./../../api/queue.ts";
import { AxiosResponse } from "axios";

export const getHomeworks = async (
  active: boolean,
): Promise<AxiosResponse<HomeworkShort[]>> => {
  if (!localStorage.getItem("accessToken")) {
    await startRefresh();
  }
  return enqueueRequest<HomeworkShort[]>(() =>
    api.get<HomeworkShort[]>(`/homeworks?active=${active}`),
  );
};

export const getActiveHomeworkInfo = async (
  homework_id: string,
): Promise<AxiosResponse<ActiveHomeworkInfo>> => {
  if (!localStorage.getItem("accessToken")) {
    await startRefresh();
  }
  return enqueueRequest<ActiveHomeworkInfo>(() =>
    api.get<ActiveHomeworkInfo>(`/homeworks/${homework_id}/active`),
  );
};

export const getCompletedHomework = async (
  homework_id: string,
): Promise<AxiosResponse<CompletedHomeworkStudent>> => {
  if (!localStorage.getItem("accessToken")) {
    await startRefresh();
  }
  return enqueueRequest<CompletedHomeworkStudent>(() =>
    api.get<CompletedHomeworkStudent>(`/homeworks/${homework_id}/completed`),
  );
};

export const getHomeworkTeacher = async (
  homework_id: string,
): Promise<AxiosResponse<HomeworkTeacher>> => {
  if (!localStorage.getItem("accessToken")) {
    await startRefresh();
  }
  return enqueueRequest<HomeworkTeacher>(() =>
    api.get<HomeworkTeacher>(`/homeworks/${homework_id}`),
  );
};

export const updateHomeworkTeacher = async (
  homework_id: string,
  data: UpdateHomeworkTeacher,
): Promise<AxiosResponse<{ id: string }>> => {
  if (!localStorage.getItem("accessToken")) {
    await startRefresh();
  }
  return enqueueRequest<{ id: string }>(() =>
    api.patch<{ id: string }>(`/homeworks/${homework_id}`, data),
  );
};

export const deleteHomeworkTeacher = async (
  homework_id: string,
): Promise<AxiosResponse> => {
  if (!localStorage.getItem("accessToken")) {
    await startRefresh();
  }
  return enqueueRequest(() => api.delete(`/homeworks/${homework_id}`));
};

export const getVariantsTaskByBlock = async (
  block_id: string,
): Promise<AxiosResponse<TrainingSimulatorShort[]>> => {
  if (!localStorage.getItem("accessToken")) {
    await startRefresh();
  }
  return enqueueRequest<TrainingSimulatorShort[]>(() =>
    api.get<TrainingSimulatorShort[]>(`/variants?block_id=${block_id}`),
  );
};

export const createHomeworkTeacher = async (
  data: CreateHomework,
): Promise<AxiosResponse<{ id: string }>> => {
  if (!localStorage.getItem("accessToken")) {
    await startRefresh();
  }
  return enqueueRequest<{ id: string }>(() =>
    api.post<{ id: string }>(`/homeworks`, data),
  );
};

export const submitHomeworkStudent = async (
  homework_id: string,
  data: CheckHomework[] | undefined,
): Promise<AxiosResponse> => {
  if (!localStorage.getItem("accessToken")) {
    await startRefresh();
  }
  return enqueueRequest<{ id: string }>(() =>
    api.post(`/homeworks/${homework_id}/submit`, data),
  );
};
