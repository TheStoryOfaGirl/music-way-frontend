import { Task } from "@models";
import { api } from "./../../api/api";
import { startRefresh, enqueueRequest } from "./../../api/queue";
import { AxiosResponse } from "axios";

export const getTask = async (
  homework_id: string,
  task_number: number,
): Promise<AxiosResponse<Task>> => {
  if (!localStorage.getItem("accessToken")) {
    await startRefresh();
  }
  return enqueueRequest<Task>(() =>
    api.get<Task>(`/tasks/${homework_id}/${task_number}`),
  );
};
