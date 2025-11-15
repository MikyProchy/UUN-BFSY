import React, { Dispatch, SetStateAction, useCallback, useState } from "react";
import ListLayout, {
  AddButton,
  NewEntry,
} from "@/components/list-detail/ListLayout";
import { Modal } from "@/components/common/Modal";
import { todoLists } from "@/data/todoLists";
import { randomUUID } from "node:crypto";
import { ListDto } from "@/types/listTypes";
import newListModal from "@/components/core/NewListModal";
import { ModalFooter } from "flowbite-react";
import { v4 } from "uuid";

export type CreateListDto = Pick<ListDto, "members" | "items" | "listName">;

interface Props {
  show: boolean;
  onHide: () => void;
}

const NewListModal = ({ show, onHide }: Props) => {
  const [isNewItem, setIsNewItem] = useState(false);
  const [isNewMember, setIsNewMember] = useState(false);

  const [list, setList] = useState<CreateListDto>({
    items: [],
    members: [],
    listName: "",
  });

  const setItems = useCallback(
    (items: CreateListDto["items"]) => {
      setList((s) => ({
        ...s,
        items,
      }));
    },
    [setList],
  );

  const setMembers = useCallback(
    (members: CreateListDto["members"]) => {
      setList((s) => ({
        ...s,
        members,
      }));
    },
    [setList],
  );

  const reset = useCallback(() => {
    setIsNewItem(false);
    setIsNewMember(false);
    setList({
      items: [],
      members: [],
      listName: "",
    });
  }, [setIsNewMember]);

  const close = useCallback(() => {
    reset();
    onHide();
  }, [onHide, reset]);

  const handleSubmit = useCallback(() => {
    todoLists.push({
      ...list,
      listName: list.listName || "Untitled List",
      id: v4(),
      dateCreated: new Date().toISOString(),
      state: "active",
      owner: "miky@example.com",
    });
    close();
  }, [list, close]);

  return (
    <Modal title="Create a new list" show={show} onHide={close}>
      <div className="flex flex-col justify-center items-center h-max gap-4">
        <label className="flex flex-col w-full">
          <span className="text-lg text-primary px-1">List Name</span>
          <input className="border rounded-md border-gray-600 px-2 py-0.5" />
        </label>
        <ListLayout title={"ITEM LIST"}>
          {list.items.map(({ itemName }, idx) => (
            <div
              key={`${itemName}-${idx}`}
              className="flex justify-between items-center h-fit w-full bg-primary-light"
            >
              <h5 className="text-white text-xl pl-2">{itemName}</h5>
              <button
                onClick={() => setItems(list.items.toSpliced(idx, 1))}
                className="text-white p-2 cursor-pointer"
              >
                ✖
              </button>
            </div>
          ))}
          {isNewItem && (
            <NewEntry
              onClose={() => setIsNewItem(false)}
              onSubmit={(inputValue) => {
                setItems([
                  ...list.items,
                  { itemName: inputValue, completed: false },
                ]);
                setIsNewItem(false);
              }}
            />
          )}
          <AddButton onClick={() => setIsNewItem(true)}>
            Add a new item
          </AddButton>
        </ListLayout>
        <ListLayout title={"MEMBER LIST"}>
          {list.members.map((item, idx) => (
            <div
              key={item}
              className="flex justify-between items-center h-fit w-full bg-primary-light"
            >
              <h5 className="text-white text-xl pl-2">{item}</h5>
              <button
                onClick={() => setMembers(list.members.toSpliced(idx, 1))}
                className="text-white p-2 cursor-pointer"
              >
                ✖
              </button>
            </div>
          ))}
          {isNewMember && (
            <NewEntry
              onClose={() => setIsNewMember(false)}
              onSubmit={(inputValue) => {
                setMembers([...list.members, inputValue]);
                setIsNewMember(false);
              }}
            />
          )}
          <AddButton onClick={() => setIsNewMember(true)}>
            Add a new member
          </AddButton>
        </ListLayout>
      </div>
      <ModalFooter className="flex justify-end">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={close}
            className={
              "cursor-pointer bg-gray-500 text-white px-4 py-1 rounded-md"
            }
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className={
              "cursor-pointer bg-primary text-white px-4 py-1 rounded-md"
            }
          >
            Create List
          </button>
        </div>
      </ModalFooter>
    </Modal>
  );
};

export default NewListModal;
