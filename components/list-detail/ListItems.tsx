"use client";

import React, { useState } from "react";
import ListLayout, {
  AddButton,
  NewEntry,
} from "@/components/list-detail/ListLayout";
import { ListDto } from "@/types/listTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { CompletionPie } from "@/components/core/PieChart";

const ListItems = ({ list }: { list: ListDto }) => {
  const { id: listId, items } = list;
  const [isNewItem, setIsNewItem] = useState(false);

  const queryClient = useQueryClient();

  const { mutate: addItem } = useMutation({
    mutationFn: async (name: string) => {
      return (
        await axios.post(`/api/lists/${listId}/items`, {
          itemName: name,
          completed: false,
        })
      ).data;
    },
    onSuccess: (data) => {
      setIsNewItem(false);
      queryClient.setQueryData(["lists", "list", listId], data.data);
    },
  });

  const { mutate: removeItem } = useMutation({
    mutationFn: async (idx: number) => {
      return (await axios.delete(`/api/lists/${listId}/items/${idx}`)).data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["lists", "list", listId], data.data);
    },
  });

  const [togglingIndex, setTogglingIndex] = useState<number | null>(null);
  const { mutate: toggleItem, isPending: isToggling } = useMutation({
    mutationFn: async (idx: number) => {
      return (await axios.patch(`/api/lists/${listId}/items/${idx}/toggle`))
        .data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["lists", "list", listId], data.data);
    },
    onMutate: (idx) => {
      setTogglingIndex(idx);
    },
    onSettled: () => {
      setTogglingIndex(null);
    },
  });

  const total = items.length;
  const completed = items.filter((i) => i.completed).length;

  return (
    <ListLayout title={"ITEM LIST"}>
      <div className="p-4 px-6 bg-primary-light w-full border-b-primary border-b-2 flex gap-6 justify-center">
        <CompletionPie completed={completed} total={total} />
        <div className="flex flex-col my-auto gap-2">
          <div className="flex gap-2 items-baseline">
            <div className="h-3 w-3" style={{ backgroundColor: "white" }} />
            <div className="text-white">Completed</div>
          </div>
          <div className="flex gap-2 items-baseline">
            <div
              className="h-3 w-3"
              style={{ backgroundColor: "rgba(255,255,255,0.35)" }}
            />
            <div className="text-white">Remaining</div>
          </div>
          <p className="text-white font-bold">
            {((completed / total) * 100).toFixed(0)}% Done
          </p>
        </div>
      </div>
      {items.map((item, idx) => (
        <div
          key={item.itemName + idx}
          className="flex justify-between items-center w-full bg-primary-light"
        >
          <div className="flex w-full items-center">
            <div className="p-2 cursor-pointer">
              <input
                type="checkbox"
                disabled={togglingIndex === idx}
                checked={item.completed}
                onChange={() => toggleItem(idx)}
                className="cursor-pointer"
              />
            </div>

            <h5 className="text-white text-xl">{item.itemName}</h5>
          </div>
          <div
            className="text-white p-2 cursor-pointer"
            onClick={() => removeItem(idx)}
          >
            ✖
          </div>
        </div>
      ))}
      {isNewItem && (
        <NewEntry
          onClose={() => setIsNewItem(false)}
          onSubmit={(name) => addItem(name)}
        />
      )}
      <AddButton onClick={() => setIsNewItem(true)}>Add a new item</AddButton>
    </ListLayout>
  );
};

export default ListItems;
