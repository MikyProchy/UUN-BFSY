import React from "react";
import { todoLists } from "@/data/todoLists";
import ListDetailWrapper from "@/components/list-detail/ListDetailWrapper";

export const dynamicParams = false;

export async function generateStaticParams() {
  return todoLists.map((l) => ({ id: l.id }));
}

const Page = () => <ListDetailWrapper />;

export default Page;
