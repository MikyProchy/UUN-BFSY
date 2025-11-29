import { NextResponse } from "next/server";
import { getTodoLists, setTodoLists } from "@/data/todoLists";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const lists = getTodoLists();
  const res = lists.find((l) => l.id === id);

  await new Promise((r) => setTimeout(r, 500));

  if (!res) {
    return NextResponse.json({ error: "List not found" }, { status: 404 });
  }

  return NextResponse.json(res);
}

export async function DELETE(
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

  const updatedList = {
    ...list,
    items: list.items.toSpliced(index, 1),
  };

  const updatedLists = lists.map((l) => (l.id === id ? updatedList : l));
  setTodoLists(updatedLists);

  return NextResponse.json({ message: "Item deleted", data: updatedList });
}
