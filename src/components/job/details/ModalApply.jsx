import { Modal } from "@mantine/core";
import React from "react";

const ModalApply = ({ open, onClose }) => {
  return (
    <Modal opened={open} onClose={onClose} title="Authentication">
      {/* Modal content */}
    </Modal>
  );
};

export default ModalApply;
