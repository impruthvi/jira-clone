"use client";

import { ResponsiveModal } from "@/components/responsive-modal";

import { CreateTaskWrapper } from "./create-task-modal-wrapper";
import { useCreateTaskModal } from "../hooks/use-create-task-modal";

export const CreateTaskModal = () => {
  const { isOpen, close, setModalState } = useCreateTaskModal();

  return (
    <ResponsiveModal open={isOpen} onOpenChange={setModalState}>
      <CreateTaskWrapper onCancel={close} />
    </ResponsiveModal>
  );
};
