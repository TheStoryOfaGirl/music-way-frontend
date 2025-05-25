import {
  ErrorResponse,
  ClassStudentShort,
  ClassStudent,
  CompletedHomeworkTeacher,
} from "@models";
import { useQuery } from "@tanstack/react-query";
import {
  getClasses,
  getClassStudent,
  getCompletedHomeworksTeacher,
} from "./../../api/services";
import { AxiosResponse, AxiosError } from "axios";

export const useGetClasses = () => {
  return useQuery<
    AxiosResponse<ClassStudentShort[]>,
    AxiosError<ErrorResponse>,
    AxiosResponse<ClassStudentShort[]>,
    (string | boolean)[]
  >({
    queryKey: ["get-classes"],
    queryFn: () => getClasses(),
    enabled: !!localStorage.getItem("accessToken"),
  });
};

export const useGetClassStudent = (classId: string) => {
  return useQuery<
    AxiosResponse<ClassStudent>,
    AxiosError<ErrorResponse>,
    AxiosResponse<ClassStudent>,
    (string | boolean)[]
  >({
    queryKey: ["get-class-student", classId],
    queryFn: () => getClassStudent(classId),
    enabled: !!localStorage.getItem("accessToken") && !!classId,
    staleTime: 1000,
  });
};

export const useGetCompletedHomeworksTeacher = (classId: string) => {
  return useQuery<
    AxiosResponse<CompletedHomeworkTeacher[]>,
    AxiosError<ErrorResponse>,
    AxiosResponse<CompletedHomeworkTeacher[]>,
    (string | boolean)[]
  >({
    queryKey: ["get-completed-homeworks-teacher", classId],
    queryFn: () => getCompletedHomeworksTeacher(classId),
    enabled: !!localStorage.getItem("accessToken") && !!classId,
    staleTime: 1000,
  });
};
