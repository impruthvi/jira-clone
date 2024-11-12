"use client";

import { ResponsiveModal } from "@/components/responsive-modal";

import { CreateTaskWrapper } from "./create-task-modal-wrapper";
import { useCreateTaskModal } from "../hooks/use-create-task-modal";

export const CreateTaskModal = () => {
  const { isOpen, setIsOpen, close } = useCreateTaskModal();

  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <CreateTaskWrapper onCancel={close} />
    </ResponsiveModal>
  );
};
