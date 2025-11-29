import { NextResponse } from "next/server";
import { getTodoLists, setTodoLists } from "@/data/todoLists";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const archived = searchParams.get("archived");
  const lists = getTodoLists();

  const filtered = lists
    .filter((l) => (archived === "true" ? true : l.state === "active"))
    .sort((a, b) => (a.dateCreated > b.dateCreated ? -1 : 1));

  await new Promise((r) => setTimeout(r, 700));

  return NextResponse.json([...filtered]);
}
