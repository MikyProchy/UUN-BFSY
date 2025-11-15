"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useList } from "@/helpers/listStore";
import Link from "next/link";
import ListItems from "@/components/list-detail/ListItems";
import ListMembers from "@/components/list-detail/ListMembers";

const Page = () => {
  const { id } = useParams<{ id: string }>();
  const list = useList(id);

  if (!list) return <div>List not found</div>;

  return (
    <main className="w-screen h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center h-max gap-4">
        <Link
          href="/"
          className="grid grid-cols-[1fr_auto_1fr] gap-4 items-center bg-primary py-2 px-4 rounded-md text-white text-2xl font-bold w-full"
        >
          <span className="justify-self-start rotate-180 pb-1">➜</span>
          <span className="justify-self-center">{list.listName}</span>
          <span className="invisible">➜</span>
        </Link>
        <ListItems list={list} />
        <ListMembers list={list} />
      </div>
    </main>
  );
};

export default Page;
