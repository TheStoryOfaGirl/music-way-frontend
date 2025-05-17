import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createHomeworkTeacher,
  deleteHomeworkTeacher,
  getActiveHomeworkInfo,
  getCompletedHomework,
  getHomeworks,
  getHomeworkTeacher,
  getVariantsTaskByBlock,
  submitHomeworkStudent,
  updateHomeworkTeacher,
} from "./../../api/services";
import { useAuthStore } from "@stores";
import { useCheckAuth } from "./useAuth";
import { AxiosError, AxiosResponse } from "axios";
import { CheckHomework, ErrorResponse, HomeworkShort, UpdateHomeworkTeacher } from "@models";

export const useGetHomeworks = (active: boolean) => {
  // const {isSuccess} = useCheckAuth(window.location.pathname);
  return useQuery<
    AxiosResponse<HomeworkShort[], any>,
    AxiosError<ErrorResponse>,
    AxiosResponse<HomeworkShort[], any>,
    (string | boolean)[]
  >({
    queryKey: ["get-homeworks", active],
    queryFn: () => getHomeworks(active),
    enabled: !!localStorage.getItem("accessToken"),
  });
};

export const useGetActiveHomeworkInfo = (homework_id: string) => {
  return useQuery({
    queryKey: ["get-active-homework-info", homework_id],
    queryFn: () => getActiveHomeworkInfo(homework_id),
    enabled: !!localStorage.getItem("accessToken") && !!homework_id,
  });
};

export const useGetCompletedHomework = (homework_id: string) => {
  return useQuery({
    queryKey: ["get-completed-homework", homework_id],
    queryFn: () => getCompletedHomework(homework_id),
    enabled: !!localStorage.getItem("accessToken") && !!homework_id,
  });
};

export const useGetHomeworkTeacher = (homework_id: string) => {
  return useQuery({
    queryKey: ["get-completed-homework-teacher", homework_id],
    queryFn: () => getHomeworkTeacher(homework_id),
    enabled: !!localStorage.getItem("accessToken") && !!homework_id,
  });
};

export const useUpdateHomeworkTeacher = () => {
  return useMutation({
    mutationFn: ({
      homework_id,
      data,
    }: {
      homework_id: string;
      data: UpdateHomeworkTeacher;
    }) => updateHomeworkTeacher(homework_id, data),
    mutationKey: ["update-homework"],
  });
};

export const useDeleteHomeworkTeacher = () => {
  return useMutation({
    mutationFn: deleteHomeworkTeacher,
    mutationKey: ["delete-homework"],
  });
};

export const useGetVariantsTaskByBlock = (block_id: string) => {
  return useQuery({
    queryKey: ["get-variants-task-by-block", block_id],
    queryFn: () => getVariantsTaskByBlock(block_id),
    enabled: !!localStorage.getItem("accessToken") && !!block_id,
  });
};

export const useCreateHomeworkTeacher = () => {
  return useMutation({
    mutationFn: createHomeworkTeacher,
    mutationKey: ["create-homework"],
  });
};

export const useSubmitHomeworkStudent = () => {
  return useMutation({
    mutationFn: ({
      homework_id,
      data,
    }: {
      homework_id: string;
      data: CheckHomework[] | undefined;
    }) => submitHomeworkStudent(homework_id, data),
    mutationKey: ["submit-homework"],
  });
};

