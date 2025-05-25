import { useMutation, useQuery } from "@tanstack/react-query";
import {
  checkTaskTrainingSimulator,
  createTaskTrainingSimulator,
  getTrainingSimulator,
  getTrainingSimulators,
} from "../services/trainingSimulatorsService";
import { CheckTask } from "@models";

export const useGetTrainingSimulators = () => {
  return useQuery({
    queryKey: ["get-training-simulators"],
    queryFn: () => getTrainingSimulators(),
    enabled: !!localStorage.getItem("accessToken"),
  });
};

export const useGetTrainingSimulator = (variant_id: string) => {
  return useQuery({
    queryKey: ["get-training-simulator", variant_id],
    queryFn: () => getTrainingSimulator(variant_id),
    enabled: !!localStorage.getItem("accessToken"),
  });
};

export const useCheckTaskTrainingSimulator = () => {
  return useMutation({
    mutationFn: ({ taskId, data }: { taskId: string; data: CheckTask }) =>
      checkTaskTrainingSimulator(taskId, data),
    mutationKey: ["check-task"],
  });
};

export const useCreateTaskTrainingSimulator = () => {
  return useMutation({
    mutationFn: createTaskTrainingSimulator,
    mutationKey: ["create-task"],
  });
};
