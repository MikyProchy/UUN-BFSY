"use client";

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import ListItems from "@/components/list-detail/ListItems";
import ListMembers from "@/components/list-detail/ListMembers";
import { LuLoader } from "react-icons/lu";
import { useList } from "@/hooks/useList";

const Page = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isError, isLoading, isSuccess } = useList(id);

  return (
    <main className="w-screen h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center h-max gap-4">
        {isError && <p>List not found</p>}
        {isLoading && (
          <LuLoader
            className="animate-[spin_2s_linear_infinite] self-center text-primary-light mt-4"
            size={36}
          />
        )}
        {isSuccess && (
          <>
            <Link
              href="/"
              className="grid grid-cols-[1fr_auto_1fr] gap-4 items-center bg-primary py-2 px-4 rounded-md text-white text-2xl font-bold w-full"
            >
              <span className="justify-self-start rotate-180 pb-1">➜</span>
              <span className="justify-self-center">{data?.listName}</span>
            </Link>
            <ListItems list={data} />
            <ListMembers list={data} />
          </>
        )}
      </div>
    </main>
  );
};

export default Page;
