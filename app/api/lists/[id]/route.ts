import { NextResponse } from "next/server";
import { getTodoLists, setTodoLists } from "@/data/todoLists";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const lists = getTodoLists();
  const res = lists.find((l) => l.id === id);

  await new Promise((r) => setTimeout(r, 700));

  if (!res) {
    return NextResponse.json({ error: "List not found" }, { status: 404 });
  }

  return NextResponse.json(res);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const lists = getTodoLists();
  const idx = lists.findIndex((l) => l.id === id);

  if (idx === -1)
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  const newLists = [...lists];
  newLists.splice(idx, 1);
  setTodoLists(newLists);

  return NextResponse.json({ message: "Deleted" });
}
