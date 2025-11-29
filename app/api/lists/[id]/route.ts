import { todoLists } from "@/data/todoLists";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const res = todoLists.find((l) => l.id === id);

  await new Promise((r) => setTimeout(r, 700));

  if (!res) {
    return NextResponse.json({ error: "List not found" }, { status: 404 });
  }

  return NextResponse.json(res);
}
