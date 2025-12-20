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
      popup
      position="center"
      onClose={onHide}
      className="backdrop-blur-xs h-screen"
    >
      <div className="bg-background shadow-2xl rounded-lg max-w-[640px] w-full mx-auto px-8 py-6 my-auto">
        <ModalHeader className="px-4">
          <span className="text-foreground text-2xl">{title}</span>
        </ModalHeader>
        <ModalBody>
          <div className="text-foreground space-y-6 p-4">{children}</div>
        </ModalBody>
      </div>
    </MuiModal>
  );
}
