import { NextResponse } from "next/server";
import { getTodoLists, setTodoLists } from "@/data/todoLists";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string; memberId: string }> },
) {
  const { id, memberId } = await params;

  const lists = getTodoLists();
  const listIdx = lists.findIndex((l) => l.id === id);

  await new Promise((r) => setTimeout(r, 500));

  if (listIdx === -1) {
    return NextResponse.json({ error: "List not found" }, { status: 404 });
  }

  const list = lists[listIdx];

  const updatedList = {
    ...list,
    members: list.members.filter((m) => m !== memberId),
  };

  const newLists = lists.toSpliced(listIdx, 1, updatedList);
  setTodoLists(newLists);

  return NextResponse.json({
    message: "Member deleted successfully",
    data: updatedList,
  });
}
