import { NextResponse } from "next/server";
import { getTodoLists, setTodoLists } from "@/data/todoLists";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string; idx: string }> },
) {
  const { id, idx } = await params;
  const index = Number(idx);

  const lists = getTodoLists();
  const list = lists.find((l) => l.id === id);

  await new Promise((r) => setTimeout(r, 500));

  if (!list) {
    return NextResponse.json({ error: "List not found" }, { status: 404 });
  }

  if (index < 0 || index >= list.items.length) {
    return NextResponse.json({ error: "Invalid item index" }, { status: 400 });
  }

  const currentItem = list.items[index];

  const updatedItems = list.items.toSpliced(index, 1, {
    ...currentItem,
    completed: !currentItem.completed,
  });

  const updatedList = {
    ...list,
    items: updatedItems,
  };

  const updatedLists = lists.map((l) => (l.id === id ? updatedList : l));

  setTodoLists(updatedLists);

  return NextResponse.json({ message: "Item toggled", data: updatedList });
}
