import React from "react";
import { ListDto } from "@/types/listTypes";
import Link from "next/link";

type Props = {
  list: ListDto;
};

const ListLink = ({ list }: Props) => {
  return (
    <Link
      className="rounded-md py-1 px-2 bg-primary-light"
      href={`/list/${list.id}`}
    >
      {list.listName} {">"}
    </Link>
  );
};

export default ListLink;
