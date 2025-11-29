import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { ListDto } from "@/types/listTypes";

export const useLists = (showArchived?: boolean) => {
  const queryParams = new URLSearchParams();

  if (showArchived) {
    queryParams.set("archived", "true");
  }

  return useQuery<ListDto[], AxiosError>({
    queryKey: ["lists", showArchived],
    queryFn: async () => {
      return (await axios.get(`/api/lists?${queryParams}`)).data;
    },
  });
};
