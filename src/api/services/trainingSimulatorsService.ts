import { TrainingSimulatorShort, TrainingSimulatorVariant } from "@models";
import { api } from "../api";
import { startRefresh, enqueueRequest } from "../queue";
import { AxiosResponse } from "axios";

export const getTrainingSimulators = async (): Promise<
  AxiosResponse<TrainingSimulatorShort[]>
> => {
  if (!localStorage.getItem("accessToken")) {
    await startRefresh();
  }
  return enqueueRequest<TrainingSimulatorShort[]>(() =>
    api.get<TrainingSimulatorShort[]>(`/variants`),
  );
};

export const getTrainingSimulator = async (
  variant_id: string,
): Promise<AxiosResponse<TrainingSimulatorVariant>> => {
  if (!localStorage.getItem("accessToken")) {
    await startRefresh();
  }
  return enqueueRequest<TrainingSimulatorVariant>(() =>
    api.get<TrainingSimulatorVariant>(`/variants/${variant_id}`),
  );
};
