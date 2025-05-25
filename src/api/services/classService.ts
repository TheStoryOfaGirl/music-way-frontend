import {
  ClassStudent,
  ClassStudentShort,
  CompletedHomeworkTeacher,
} from "@models";
import { api } from "./../../api/api";
import { startRefresh, enqueueRequest } from "./../../api/queue";
import { AxiosResponse } from "axios";

export const getClasses = async (): Promise<
  AxiosResponse<ClassStudentShort[]>
> => {
  if (!localStorage.getItem("accessToken")) {
    await startRefresh();
  }
  return enqueueRequest<ClassStudentShort[]>(() =>
    api.get<ClassStudentShort[]>(`/classes`),
  );
};

export const getClassStudent = async (
  classId: string,
): Promise<AxiosResponse<ClassStudent>> => {
  if (!localStorage.getItem("accessToken")) {
    await startRefresh();
  }
  return enqueueRequest<ClassStudent>(() =>
    api.get<ClassStudent>(`/classes/${classId}`),
  );
};

export const getCompletedHomeworksTeacher = async (
  classId: string,
): Promise<AxiosResponse<CompletedHomeworkTeacher[]>> => {
  if (!localStorage.getItem("accessToken")) {
    await startRefresh();
  }
  return enqueueRequest<CompletedHomeworkTeacher[]>(() =>
    api.get<CompletedHomeworkTeacher[]>(`/classes/${classId}/last_homework`),
  );
};
