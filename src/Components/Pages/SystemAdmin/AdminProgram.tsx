import { useEffect, useState } from "react";
import { Programs } from "../../models/Programs";
import axios from "axios";
import { Row, Col, Card } from "antd";
import { Link } from "react-router-dom";

const { Meta } = Card;
const AdminProgram = () => {
  const adminProgram = "https://stem-backend.vercel.app/api/v1/programs";
  const [programs, setPrograms] = useState<Programs[]>([]);
  async function getProgram() {
    try {
      await axios.get(`${adminProgram}`).then((response) => {
        setPrograms(response.data);
      });
    } catch (error) {
      console.error("Error fetching programs:", error);
    }
  }
  useEffect(() => {
    getProgram();
  }, []);

  return (
    <div>
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
