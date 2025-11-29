import { NextResponse } from "next/server";
import { getTodoLists, setTodoLists } from "@/data/todoLists";
import { ListDto, ListItemDto } from "@/types/listTypes";
import { CreateListDto } from "@/components/core/NewListModal";
import { v4 } from "uuid";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const body = (await request.json()) as ListItemDto;
  const { id } = await params;

  const lists = getTodoLists();
  const idx = lists.findIndex((l) => l.id === id);

  await new Promise((r) => setTimeout(r, 500));

  if (idx === -1)
    return NextResponse.json({ error: "List not found" }, { status: 404 });

  const updatedList = {
    ...lists[idx],
    items: [...lists[idx].items, body],
  };

  const newLists = lists.toSpliced(idx, 1, updatedList);
  setTodoLists(newLists);

  return NextResponse.json({
    message: "Items added successfully",
    data: updatedList,
  });
}
