import { DatePicker, Form, Input, Modal } from "antd";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Labs } from "../../models/Labs";

interface CreateLabProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  addNewLab: (newLab: Labs) => void; // Prop để thêm lab mới
}

const { TextArea } = Input;
const CreateLabs = ({ open, setOpen, addNewLab }: CreateLabProps) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [confirmLoading, setConfirmLoading] = useState(false);
  const programId = String(useParams().id);

  const handleCancel = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    if (startDate.length === 0 || endDate.length === 0 || topic.length === 0 || description.length === 0 || image.length === 0) {
      return;
    }

    const labData = {
      StartDate: startDate,
      EndDate: endDate,
      Topic: topic,
      Description: description,
      Image: image,
    };

    const url = `https://stem-backend.vercel.app/api/v1/labs?ProgramId=${programId}`;
    
    try {
      const response = await axios.post(url, labData);
      // Gọi hàm addNewLab với lab mới được trả về từ API
      addNewLab(response.data);
      setStartDate("");
      setEndDate("");
      setTopic("");
      setDescription("");
      setImage("");
      setConfirmLoading(true);
      setTimeout(() => {
        setOpen(false);
        setConfirmLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error adding lab:", error);
      setConfirmLoading(false);
    }
  };

  return (
    <div>
      <Modal
        title="Add Lab"
        visible={open}
        onOk={handleSubmit}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form layout="vertical">
          <Form.Item label="Topic" required>
            <Input
              value={topic}
              placeholder="Topic name"
              onChange={(e) => setTopic(e.target.value)}
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
          <Form.Item label="Image URl" required>
            <Input
              value={image}
              placeholder="Image URL"
              onChange={(e) => setImage(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Start Date" required>
            <DatePicker
              onChange={(date) => setStartDate(date.toString())}
            />
          </Form.Item>
          <Form.Item label="End Date" required>
            <DatePicker
              onChange={(date) => setEndDate(date.toString())}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CreateLabs;
