import React, { useEffect, useState } from "react";
import { Programs } from "../../models/Programs";
import axios from "axios";
import { Row, Col, Card, Button } from "antd";
import { Link } from "react-router-dom";
import CreateProgram from "./CreateProgram";

const { Meta } = Card;

const AdminProgram: React.FC = () => {
  const adminProgram = "https://stem-backend.vercel.app/api/v1/programs";
  const [programs, setPrograms] = useState<Programs[]>([]);
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  async function getProgram() {
    try {
      const response = await axios.get(`${adminProgram}`);
      setPrograms(response.data);
    } catch (error) {
      console.error("Error fetching programs:", error);
    }
  }

  useEffect(() => {
    getProgram();
  }, []);

  return (
    <div>
      <Button type="primary" onClick={showModal} style={{ marginBottom: 16 }}>
        Add Program
      </Button>
      <CreateProgram open={open} setOpen={setOpen} />
      <Row gutter={[16, 16]}>
        {programs.map((program) => (
          <Col key={program.Id} xs={24} sm={12} md={8} lg={6}>
            <Card
              cover={<img alt={program.Name} src={program.Image} />}
              style={{ height: "100%", overflow: "hidden" }}
              bordered={false}
              hoverable
            >
              <Meta
                title={
                  <Link to={`./details/${program.Id}`}>{program.Name}</Link>
                }
                description={program.Description}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default AdminProgram;
