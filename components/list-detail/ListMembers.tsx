"use client";

import React, { useState } from "react";
import ListLayout, {
  AddButton,
  NewEntry,
} from "@/components/list-detail/ListLayout";
import { ListDto } from "@/types/listTypes";
import { removeMember } from "@/helpers/listStore";

const ListMembers = ({ list }: { list: ListDto }) => {
  const { id: listId, members } = list;
  const [isNewMember, setIsNewMember] = useState(false);

  return (
    <ListLayout title="MEMBER LIST">
      <>
        {members.length > 0 ? (
          members.map((member) => (
            <div
              key={member}
              className="flex justify-between items-center h-fit w-full bg-primary-light"
            >
              <h5 className="text-white text-xl pl-2">{member}</h5>
              <button
                onClick={() => removeMember(listId, member)}
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
            onSubmit={(inputValue) => {
              members.push(inputValue);
              setIsNewMember(false);
            }}
          />
        )}
        <AddButton onClick={() => setIsNewMember(true)}>
          Add a new member
        </AddButton>
      </>
    </ListLayout>
  );
};

export default ListMembers;
