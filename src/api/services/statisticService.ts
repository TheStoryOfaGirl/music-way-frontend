import {
  StatisticByHomeworks as StatisticByHomeworks,
  StatisticByHomeworkTask as StatisticByHomeworkTask,
  StatisticByTopicBlock,
  StatisticByUser,
} from "@models";
import { enqueueRequest, startRefresh } from "../queue";
import { AxiosResponse } from "axios";
import { api } from "../api";

export const getStatisticByTopicBlock = async (
  block_id: string,
): Promise<AxiosResponse<StatisticByTopicBlock[]>> => {
  if (!localStorage.getItem("accessToken")) {
    await startRefresh();
  }
  return enqueueRequest<StatisticByTopicBlock[]>(() =>
    api.get<StatisticByTopicBlock[]>(`/topic-blocks/${block_id}/statistic`),
  );
};

export const getStatisticByUser = async (): Promise<
  AxiosResponse<StatisticByUser>
> => {
  if (!localStorage.getItem("accessToken")) {
    await startRefresh();
  }
  return enqueueRequest<StatisticByUser>(() =>
    api.get<StatisticByUser>(`/users/statistic`),
  );
};

export const getStatisticByHomework = async (
  classId: string,
): Promise<AxiosResponse<StatisticByHomeworks[]>> => {
  if (!localStorage.getItem("accessToken")) {
    await startRefresh();
  }
  return enqueueRequest<StatisticByHomeworks[]>(() =>
    api.get<StatisticByHomeworks[]>(`/classes/${classId}/statistic`),
  );
};

export const getStatisticByHomeworkTask = async (
  homeworkId: string,
): Promise<AxiosResponse<StatisticByHomeworkTask[]>> => {
  if (!localStorage.getItem("accessToken")) {
    await startRefresh();
  }
  return enqueueRequest<StatisticByHomeworkTask[]>(() =>
    api.get<StatisticByHomeworkTask[]>(`/homeworks/${homeworkId}/statistic`),
  );
};
