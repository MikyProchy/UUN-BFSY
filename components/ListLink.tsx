"use client";

import React, { useCallback, useState } from "react";
import { ListDto } from "@/types/listTypes";
import Link from "next/link";
import { FaArrowRight, FaTrash } from "react-icons/fa";
import { Modal } from "@/components/common/Modal";
import { removeList } from "@/helpers/listStore";

type Props = {
  list: ListDto;
};

const ListLink = ({ list }: Props) => {
  const [isDeleteListModalOpen, setIsDeleteListModalOpen] = useState(false);

  const handleDelete = useCallback(() => {
    if (!list) return;
    removeList(list.id);
  }, [list]);

  return (
    <div
      className="rounded-md py-4 px-4 bg-primary-light flex gap-4"
      style={{ opacity: list.state === "archived" ? "0.55" : 1 }}
    >
      <div className="flex flex-col items-center justify-between">
        <Link href={`/list/${list.id}`}>
          <FaArrowRight color={"white"} />
        </Link>
        <FaTrash
          onClick={() => setIsDeleteListModalOpen(true)}
          className="text-white hover:text-red-500 transition-colors cursor-pointer"
        />
      </div>
      <Link
        href={`/list/${list.id}`}
        className={"flex flex-col gap-2 text-white"}
      >
        <span className={"text-lg leading-4"}>{list.listName}</span>
        <span className={"leading-4"}>{list.owner}</span>
      </Link>
      <Modal
        title="Delete List"
        show={isDeleteListModalOpen}
        onHide={() => setIsDeleteListModalOpen(false)}
      >
        <p>
          Are you sure you want to delete this list? This action cannot be
          undone.
        </p>
        <div className="flex justify-end">
          <div className="flex gap-2 items-center">
            <button
              type="button"
              className="rounded-md bg-gray-500 px-4 py-1 text-white cursor-pointer"
              onClick={() => setIsDeleteListModalOpen(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="rounded-md bg-red-600 px-4 py-1 text-white cursor-pointer"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ListLink;
