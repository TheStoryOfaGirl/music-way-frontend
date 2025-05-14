import {
  FeedbackData,
  MaterialBlock,
  StatisticByTopicBlock,
  TasksTheme,
  TextTheme,
  Theme,
  VideoTheme,
} from "@models";
import { api } from "./../../api/api";
import { startRefresh, enqueueRequest } from "./../../api/queue";
import { AxiosResponse } from "axios";

export const getMaterials = async (): Promise<
  AxiosResponse<MaterialBlock[]>
> => {
  if (!localStorage.getItem("accessToken")) {
    await startRefresh();
  }
  return enqueueRequest<MaterialBlock[]>(() =>
    api.get<MaterialBlock[]>(`/topic-blocks`),
  );
};

export const getFoundMaterials = async (
  query: string,
): Promise<AxiosResponse<Theme[]>> => {
  if (!localStorage.getItem("accessToken")) {
    await startRefresh();
  }
  return enqueueRequest<Theme[]>(() =>
    api.get<Theme[]>(`/materials/search?query=${query}`),
  );
};

export const getThemes = async (
  blockId: string,
): Promise<AxiosResponse<Theme[]>> => {
  if (!localStorage.getItem("accessToken")) {
    await startRefresh();
  }
  return enqueueRequest<Theme[]>(() =>
    api.get<Theme[]>(`/materials?block_id=${blockId}`),
  );
};

export const getVideoByTheme = async (
  materialId: string,
): Promise<AxiosResponse<VideoTheme>> => {
  if (!localStorage.getItem("accessToken")) {
    await startRefresh();
  }
  return enqueueRequest<VideoTheme>(() =>
    api.get<VideoTheme>(`/materials/${materialId}/video`),
  );
};

export const getTextByTheme = async (
  materialId: string,
): Promise<AxiosResponse<TextTheme>> => {
  if (!localStorage.getItem("accessToken")) {
    await startRefresh();
  }
  return enqueueRequest<TextTheme>(() =>
    api.get<TextTheme>(`/materials/${materialId}/text`),
  );
};

export const getTasksByTheme = async (
  materialId: string,
): Promise<AxiosResponse<TasksTheme>> => {
  if (!localStorage.getItem("accessToken")) {
    await startRefresh();
  }
  return enqueueRequest<TasksTheme>(() =>
    api.get<TasksTheme>(`/materials/${materialId}/tasks`),
  );
};

export const postFeedbackByTheme = async (data: FeedbackData & {material_id: string}
) => {
  if (!localStorage.getItem("accessToken")) {
    await startRefresh();
  }
  return enqueueRequest(() =>
    api.post(`/feedbacks`, data),
  );
};
