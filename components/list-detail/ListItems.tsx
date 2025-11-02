"use client";

import React, { useState } from "react";
import ListLayout, {
  AddButton,
  NewEntry,
} from "@/components/list-detail/ListLayout";
import { ListDto } from "@/types/listTypes";
import { todoLists } from "@/data/todoLists";
import { removeItem, toggleItemCompleted } from "@/helpers/listStore";

const ListItems = ({ list }: { list: ListDto }) => {
  const { id: listId, items } = list;
  const [isNewItem, setIsNewItem] = useState(false);

  return (
    <ListLayout title={"ITEM LIST"}>
      <>
        {items.map((item, idx) => (
          <div
            key={item.itemName}
            className="flex justify-between items-center w-full bg-primary-light"
          >
            <div className="flex w-full items-center">
              <div className="p-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => toggleItemCompleted(listId, idx)}
                  className="cursor-pointer"
                />
              </div>

              <h5 className="text-white text-xl">{item.itemName}</h5>
            </div>
            <div
              className="text-white p-2 cursor-pointer"
              onClick={() => removeItem(listId, idx)}
            >
              ✖
            </div>
          </div>
        ))}
        {isNewItem && (
          <NewEntry
            onClose={() => setIsNewItem(false)}
            onSubmit={(inputValue) => {
              items.push({
                itemName: inputValue,
                completed: false,
              });
              setIsNewItem(false);
            }}
          />
        )}
        <AddButton onClick={() => setIsNewItem(true)}>Add a new item</AddButton>
      </>
    </ListLayout>
  );
};

export default ListItems;
