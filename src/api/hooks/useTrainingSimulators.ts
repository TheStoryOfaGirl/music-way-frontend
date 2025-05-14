import { useQuery } from "@tanstack/react-query";
import {
  getTrainingSimulator,
  getTrainingSimulators,
} from "../services/trainingSimulatorsService";

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
