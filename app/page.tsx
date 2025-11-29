"use client";

import ListLink from "@/components/ListLink";
import { LuLoader, LuShoppingCart } from "react-icons/lu";
import React, { useState } from "react";
import NewListModal from "@/components/core/NewListModal";
import { useLists } from "@/hooks/useLists";

export default function Home() {
  const [shouldShowArchived, setShouldShowArchived] = useState(false);
  const [isNewListModalOpen, setIsNewListModalOpen] = useState(false);

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="flex flex-col justify-center gap-3">
        <div className={"w-full flex items-center justify-between gap-2"}>
          <LuShoppingCart
            size={44}
            className={
              "text-primary border-2 border-primary rounded-full p-2 overflow-visible"
            }
          />
          <div className={"text-white text-xl bg-primary px-8 py-2 rounded-md"}>
            My Shopping Lists
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsNewListModalOpen(true)}
          className={
            "text-white text-xl bg-primary px-2 py-1 rounded-md text-center cursor-pointer"
          }
        >
          Add new list
        </button>
        <label className="px-2 flex gap-2 bg-primary rounded-md py-1 text-white">
          <input
            checked={shouldShowArchived}
            onChange={() => setShouldShowArchived((s) => !s)}
            type="checkbox"
            className={
              "text-white text-xl bg-primary px-2 py-1 rounded-md text-center"
            }
          />
          Show archived lists
        </label>

        <Lists archived={shouldShowArchived} />
      </div>
      <NewListModal
        show={isNewListModalOpen}
        onHide={() => setIsNewListModalOpen(false)}
      />
    </div>
  );
}

const Lists = ({ archived }: { archived?: boolean }) => {
  const { data, isError, isLoading } = useLists(archived);

  if (isError) {
    return <h1>Something went wrong</h1>;
  }

  if (isLoading) {
    return (
      <LuLoader
        className="animate-[spin_2s_linear_infinite] self-center text-primary-light mt-4"
        size={36}
      />
    );
  }

  return (
    <div className="max-h-[70vh] overflow-scroll">
      <div className="flex flex-col justify-center gap-2">
        {data && data.length > 0 ? (
          data.map((list) => <ListLink key={list.id} list={list} />)
        ) : (
          <p>No lists found</p>
        )}
      </div>
    </div>
  );
};
