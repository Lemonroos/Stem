import { Modal } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface DeleteProgramProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteProgram = ({ open, setOpen }: DeleteProgramProps) => {
  const programId = String(useParams().id);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleCancel = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `https://stem-backend.vercel.app/api/v1/programs/${programId}`
      );
      setConfirmLoading(true);
      setTimeout(() => {
        setOpen(false);
        setConfirmLoading(false);
      }, 1000);
      if (!programId) {
        alert("Can not find program id");
      }
    } catch (error) {
      console.error("Error deleting program:", error);
      setConfirmLoading(false);
    }
  };
  return (
    <div>
      <Modal
        title="Do you want to delete program?"
        open={open}
        onOk={handleDelete}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      ></Modal>
    </div>
  );
};

export default DeleteProgram;
