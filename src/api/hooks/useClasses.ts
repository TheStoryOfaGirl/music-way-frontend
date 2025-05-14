import { HomeworkShort, ErrorResponse, ClassStudentShort, ClassStudent, CompletedHomeworkTeacher } from "@models";
import { useQuery } from "@tanstack/react-query";
import { getClasses, getClassStudent, getCompletedHomeworksTeacher } from "./../../api/services";
import { AxiosResponse, AxiosError } from "axios";

export const useGetClasses = () => {
  return useQuery<
    AxiosResponse<ClassStudentShort[], any>,
    AxiosError<ErrorResponse>,
    AxiosResponse<ClassStudentShort[], any>,
    (string | boolean)[]
  >({
    queryKey: ["get-classes"],
    queryFn: () => getClasses(),
    enabled: !!localStorage.getItem("accessToken"),
  });
};

export const useGetClassStudent = (classId: string) => {
  return useQuery<
    AxiosResponse<ClassStudent, any>,
    AxiosError<ErrorResponse>,
    AxiosResponse<ClassStudent, any>,
    (string | boolean)[]
  >({
    queryKey: ["get-class-student", classId],
    queryFn: () => getClassStudent(classId),
    enabled: !!localStorage.getItem("accessToken") && !!classId
  });
};

export const useGetCompletedHomeworksTeacher = (classId: string) => {
  return useQuery<
    AxiosResponse<CompletedHomeworkTeacher[], any>,
    AxiosError<ErrorResponse>,
    AxiosResponse<CompletedHomeworkTeacher[], any>,
    (string | boolean)[]
  >({
    queryKey: ["get-completed-homeworks-teacher", classId],
    queryFn: () => getCompletedHomeworksTeacher(classId),
    enabled: !!localStorage.getItem("accessToken") && !!classId
  });
};