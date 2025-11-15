"use client";

import { Modal as MuiModal, ModalBody, ModalHeader } from "flowbite-react";
import React from "react";

interface Props {
  show?: boolean;
  onHide?: () => void;
  title?: string;
  children?: React.ReactNode;
}

export function Modal({ show, onHide, title, children }: Props) {
  return (
    <MuiModal
      show={show}
      size="sm"
      popup
      onClose={onHide}
      className="px-8 max-w-[640px] backdrop-blur-xs mx-auto"
    >
      <div className="bg-white shadow-2xl rounded-lg">
        <ModalHeader className="px-4">
          <span className="text-gray-900 text-2xl">{title}</span>
        </ModalHeader>
        <ModalBody>
          <div className="space-y-6 p-4">{children}</div>
        </ModalBody>
      </div>
    </MuiModal>
  );
}
