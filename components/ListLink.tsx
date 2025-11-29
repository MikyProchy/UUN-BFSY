"use client";

import React, { useCallback, useState } from "react";
import { ListDto } from "@/types/listTypes";
import Link from "next/link";
import { FaArrowRight, FaTrash } from "react-icons/fa";
import { Modal } from "@/components/common/Modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

type Props = {
  list: ListDto;
};

const ListLink = ({ list }: Props) => {
  const [isDeleteListModalOpen, setIsDeleteListModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      await axios.delete(`/api/lists/${list.id}`);
    },
    onSuccess: () => {
      queryClient
        .invalidateQueries({ queryKey: ["lists"] })
        .then(() => setIsDeleteListModalOpen(false));
    },
  });

  const handleDelete = useCallback(() => {
    if (!list) return;
    mutate();
  }, [list, mutate]);

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
              className={`rounded-md px-4 py-1 text-white cursor-pointer ${isPending ? "bg-red-400" : "bg-red-600"}`}
              disabled={isPending}
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
