"use client";

import React, { useState } from "react";
import ListLayout, {
  AddButton,
  NewEntry,
} from "@/components/list-detail/ListLayout";
import { ListDto } from "@/types/listTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useTranslations } from "use-intl";

const ListMembers = ({ list }: { list: ListDto }) => {
  const { id: listId, members } = list;
  const [isNewMember, setIsNewMember] = useState(false);

  const queryClient = useQueryClient();

  const { mutate: addMember } = useMutation({
    mutationFn: async (name: string) => {
      return (
        await axios.post(`/api/lists/${listId}/members`, { member: name })
      ).data;
    },
    onSuccess: (data) => {
      setIsNewMember(false);
      queryClient.setQueryData(["lists", "list", listId], data.data);
    },
  });

  const { mutate: removeMember } = useMutation({
    mutationFn: async (member: string) => {
      return (await axios.delete(`/api/lists/${listId}/members/${member}`))
        .data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["lists", "list", listId], data.data);
    },
  });

  const t = useTranslations("DetailPage.Members");

  return (
    <ListLayout title={t("title")}>
      <>
        {members.length > 0 ? (
          members.map((member) => (
            <div
              key={member}
              className="flex justify-between items-center h-fit w-full bg-primary-light"
            >
              <h5 className="text-white text-xl pl-2">{member}</h5>
              <button
                onClick={() => removeMember(member)}
                className="text-white p-2 cursor-pointer"
              >
                ✖
              </button>
            </div>
          ))
        ) : (
          <span className="h-fit py-2 w-full bg-primary-light text-center text-white">
            No members found.
          </span>
        )}
        {isNewMember && (
          <NewEntry
            onClose={() => setIsNewMember(false)}
            onSubmit={(inputValue) => addMember(inputValue)}
          />
        )}
        <AddButton onClick={() => setIsNewMember(true)}>
          {t("addMember")}
        </AddButton>
      </>
    </ListLayout>
  );
};

export default ListMembers;
