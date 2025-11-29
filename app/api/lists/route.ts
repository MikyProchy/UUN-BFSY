import { todoLists } from "@/data/todoLists";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const archived = searchParams.get("archived");

  const filtered = todoLists
    .filter((l) =>
      String(archived).toLowerCase().trim() === "true"
        ? true
        : l.state === "active",
    )
    .sort((a, b) => (a.dateCreated > b.dateCreated ? -1 : 1));

  await new Promise((r) => setTimeout(r, 700));

  return NextResponse.json([...filtered]);
}
