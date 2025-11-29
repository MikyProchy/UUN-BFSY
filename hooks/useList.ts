import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { ListDto } from "@/types/listTypes";

export const useList = (id: string | number) => {
  return useQuery<ListDto, AxiosError>({
    queryKey: ["lists", "list", id],
    queryFn: async () => {
      return (await axios.get(`/api/lists/${id}`)).data;
    },
  });
};
