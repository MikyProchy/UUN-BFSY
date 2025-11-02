"use client";

import { ReactNode, useState } from "react";

const ListLayout = ({
  children,
  title,
}: {
  title: string;
  children: ReactNode;
}) => {
  return (
    <div className="flex flex-col justify-center items-center flex-1 w-full rounded-md">
      <h4 className="text-2xl text-white font-bold px-4 py-2 bg-primary flex-1 text-center w-full rounded-t-md">
        {title}
      </h4>
      {children || "No entries"}
    </div>
  );
};

export default ListLayout;

export const NewEntry = ({
  onSubmit,
  onClose,
  placeholder,
}: {
  onClose?: () => void;
  onSubmit?: (inputValue: string) => void;
  placeholder?: string;
}) => {
  const [value, setValue] = useState("");
  return (
    <div className="flex gap-0 text-xl text-white bg-primary-light flex-1 text-center w-full cursor-pointer items-center">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="h-6 border border-white rounded-md m-2 text-sm w-full"
      />
      <div className="flex gap-0">
        <button
          className="p-2 flex justify-center items-center cursor-pointer"
          onClick={() => onSubmit?.(value)}
        >
          ✔
        </button>
        <button className="p-2 cursor-pointer" onClick={onClose}>
          ✖
        </button>
      </div>
    </div>
  );
};

export const AddButton = ({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick?: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className="text-lg text-white px-4 py-1 bg-primary flex-1 text-center w-full cursor-pointer rounded-b-md"
    >
      {children}
    </button>
  );
};
