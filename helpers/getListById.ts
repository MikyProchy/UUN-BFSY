import { ListDto } from "@/types/listTypes";
import { todoLists } from "@/data/todoLists";

export const getListById = (id?: string): ListDto | null => {
  if (!id) return null;
  return todoLists.find((list) => list.id === id) ?? null;
};
