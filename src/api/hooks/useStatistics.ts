import { useQuery } from "@tanstack/react-query";
import {
  getStatisticByHomeworkTask,
  getStatisticByHomework,
  getStatisticByTopicBlock,
  getStatisticByUser,
} from "../services/statisticService";
import { AxiosError, AxiosResponse } from "axios";
import { ErrorResponse, StatisticByUser } from "@models";

export const useGetStatisticByTopicBlock = (block_id: string) => {
  return useQuery({
    queryKey: ["get-statistic-by-topic-block", block_id],
    queryFn: () => getStatisticByTopicBlock(block_id),
    enabled: !!localStorage.getItem("accessToken") && !!block_id,
  });
};

export const useGetStatisticByUser = () => {
  return useQuery<
    AxiosResponse<StatisticByUser>,
    AxiosError<ErrorResponse>,
    AxiosResponse<StatisticByUser>,
    string[]
  >({
    queryKey: ["get-statistic-by-user"],
    queryFn: () => getStatisticByUser(),
    enabled: !!localStorage.getItem("accessToken"),
  });
};

export const useGetStatisticByHomework = (classId: string) => {
  return useQuery({
    queryKey: ["get-statistics-by-homework", classId],
    queryFn: () => getStatisticByHomework(classId),
    enabled: !!localStorage.getItem("accessToken") && !!classId,
  });
};

export const useGetStatisticByHomeworkTask = (homeworkId: string) => {
  return useQuery({
    queryKey: ["get-statistics-by-homework-task", homeworkId],
    queryFn: () => getStatisticByHomeworkTask(homeworkId),
    enabled: !!localStorage.getItem("accessToken") && !!homeworkId,
  });
};
