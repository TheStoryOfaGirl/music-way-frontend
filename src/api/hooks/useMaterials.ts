import { useMutation, useQuery } from "@tanstack/react-query";
import { getFoundMaterials, getMaterials, getTasksByTheme, getTextByTheme, getThemes, getVideoByTheme, postFeedbackByTheme } from "./../../api/services/materialService";

export const useGetMaterials = () => {
  return useQuery({
    queryKey: ["get-materials"],
    queryFn: () => getMaterials(),
    enabled: !!localStorage.getItem("accessToken"),
  });
};

export const useGetFoundMaterials = (query: string) => {
  return useQuery({
    queryKey: ["get-found-materials", query],
    queryFn: () => getFoundMaterials(query),
    enabled: !!localStorage.getItem("accessToken") && !!query,
  });
};

export const useGetThemes = (blockId: string) => {
  return useQuery({
    queryKey: ["get-themes", blockId],
    queryFn: () => getThemes(blockId),
    enabled: !!localStorage.getItem("accessToken") && !!blockId,
  });
};

export const useGetVideoByTheme = (materialId: string) => {
  return useQuery({
    queryKey: ["get-video-by-theme", materialId],
    queryFn: () => getVideoByTheme(materialId),
    enabled: !!localStorage.getItem("accessToken") && !!materialId,
  });
};

export const useGetTextByTheme = (materialId: string) => {
  return useQuery({
    queryKey: ["get-text-by-theme", materialId],
    queryFn: () => getTextByTheme(materialId),
    enabled: !!localStorage.getItem("accessToken") && !!materialId,
  });
};

export const useGetTasksByTheme = (materialId: string) => {
  return useQuery({
    queryKey: ["get-tasks-by-theme", materialId],
    queryFn: () => getTasksByTheme(materialId),
    enabled: !!localStorage.getItem("accessToken") && !!materialId,
  });
};

export const usePostFeedbackByTheme= () => {
  return useMutation({
    mutationFn: postFeedbackByTheme,
  });
};

