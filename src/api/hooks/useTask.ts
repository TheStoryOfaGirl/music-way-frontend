import { useQuery } from "@tanstack/react-query";
import { getTask } from "./../../api/services";

export const useGetTask = (homework_id: string, task_number: number) => {
  return useQuery({
    queryKey: ["get-task", homework_id, task_number],
    queryFn: () => getTask(homework_id, task_number),
    enabled:
      !!localStorage.getItem("accessToken") && !!homework_id && !!task_number,
  });
};
