import { NextResponse } from "next/server";
import { getTodoLists, setTodoLists } from "@/data/todoLists";
import { ListDto } from "@/types/listTypes";
import { CreateListDto } from "@/components/core/NewListModal";
import { v4 } from "uuid";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const archived = searchParams.get("archived");
  const lists = getTodoLists();

  const filtered = lists
    .filter((l) => (archived === "true" ? true : l.state === "active"))
    .sort((a, b) => (a.dateCreated > b.dateCreated ? -1 : 1));

  await new Promise((r) => setTimeout(r, 500));

  return NextResponse.json([...filtered]);
}

export async function POST(request: Request) {
  const body = (await request.json()) as CreateListDto;

  const todoLists = getTodoLists();

  const newList: ListDto = {
    ...body,
    id: v4(),
    owner: "mikyprochy@example.com",
    dateCreated: new Date().toISOString(),
    state: "active",
    members: body.members ?? [],
    items: body.items ?? [],
  };

  setTodoLists([...todoLists, newList]);

  await new Promise((r) => setTimeout(r, 500));

  return NextResponse.json({ message: "List created successfully" });
}
