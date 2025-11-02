"use client";

import dynamic from "next/dynamic";

const ListDetail = dynamic(
  () => import("@/components/list-detail/ListDetail"),
  { ssr: false },
);

export default function ListDetailWrapper() {
  return <ListDetail />;
}
