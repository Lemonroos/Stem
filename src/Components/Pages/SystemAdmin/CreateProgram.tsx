import { Form, Input, Modal} from "antd";
import axios from "axios";
import { useState } from "react";

const { TextArea } = Input;

interface CreateProgramProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function CreateProgram({ open, setOpen }: CreateProgramProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleCancel = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    if (name.length === 0 || name.length > 25) {
      return;
    }
    if (description.length === 0) {
      return;
    }
    if (image.length === 0) {
      return;
    }

    const programData = {
      Name: name,
      Description: description,
      Image: image,
    };

    const url =
      "https://stem-backend.vercel.app/api/v1/programs?SchoolYearId=2";
    try {
      await axios.post(url, programData);
      setName("");
      setDescription("");
      setImage("");
      // alert("Program added successfully");
      setConfirmLoading(true);
      setTimeout(() => {
        setOpen(false);
        setConfirmLoading(false);
      }, 1000)
    } catch (error) {
      console.error("Error adding program:", error);
      setConfirmLoading(false);

    }
  };

  return (
    <div>
      <Modal
        title="Add Program"
        open={open}
        onOk={handleSubmit}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form layout="vertical">
          <Form.Item label="Title" required>
            <Input
              value={name}
              placeholder="Title"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Description" required>
            <TextArea
              value={description}
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
              autoSize={{ minRows: 2, maxRows: 6 }}
            />
          </Form.Item>
          <Form.Item label="Image URL" required>
            <Input
              value={image}
              placeholder="Image URL"
              onChange={(e) => setImage(e.target.value)}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default CreateProgram;
