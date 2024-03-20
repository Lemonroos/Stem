import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Programs } from "../../models/Programs";
import MySpin from "../../UI/spin";
import {
  Button,
  Card,
  Col,
  Collapse,
  CollapseProps,
  Image,
  Row,
  Space,
  Typography,
} from "antd";
import moment from "moment";
import DeleteProgram from "./DeleteProgram";
import CreateLabs from "./CreateLabs";
import { Labs } from "../../models/Labs";

const { Text } = Typography;

const AdminProgramDetails: React.FC = () => {
  const programId = String(useParams().id);
  const [programDetails, setProgramDetails] = useState<Programs>();
  const [labs, setLabs] = useState<Labs[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>();
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const showLabs = () => {
    setOpen(false);
  }

  useEffect(() => {
    const fetchProgramDetails = async () => {
      try {
        const response = await axios.get(
          `https://stem-backend.vercel.app/api/v1/programs/${programId}`
        );
        setProgramDetails(response.data);
        const labsResponse = await axios.get (`https://stem-backend.vercel.app/api/v1/labs/lab-list/labs-in-program?ProgramId=${programId}`);
        setLabs(labsResponse.data)
        setIsLoading(false);
      } catch (error: any) {
        console.error("Error fetching program details:", error);
        setError(error.response.data.error)
        setIsLoading(false);
      }
    };
    fetchProgramDetails();
  }, [programId]);

  if (isLoading) {
    return <MySpin />;
  }

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }

  if (!programDetails) {
    return <div>Program details not found</div>;
  }
  const onChange = (key: string | string[]) => {
    console.log(key);
};

const items: CollapseProps["items"] = [];
if (labs.length > 0) {
  labs.forEach((lab) => {
    items.push({
      key: lab.Id,
      label: lab.Code,
      children: (
        <div>
          <strong>Topic</strong>
          <p>{lab.Topic}</p>
          <strong>Description</strong>
          <p>{lab.Description}</p>
          <br />
          <Link to={`./labs/${lab.Id}`}>
            <Button type="primary" block>
              Details
            </Button>
          </Link>
        </div>
      ),
    });
  });
} else {
  items.push({
    key: "no-labs",
    label: "No Labs Found",
    children: <p>There are currently no labs associated with this program.</p>,
  });
}

  return (
    <div style={{ padding: "24px" }}>
      <Button type="primary" onClick={showModal} style={{ marginBottom: 16 }}>
        Delete Program
      </Button>
      <DeleteProgram open={open} setOpen={setOpen} />
      {/* <Button type="primary" onClick={showLabs} style={{ marginBottom: 16 }}>
        Create Lab
      </Button>
      <CreateLabs open={open} setOpen={setOpen} /> */}
      <Card>
        <Row gutter={[16, 16]} style={{ marginBottom: "5%" }}>
          <Col>
            <Image
              src={programDetails.Image}
              alt="Program Cover"
              width="100%"
              height="auto"
            />
          </Col>
          <Col span={12}>
            <Row gutter={[16, 16]}>
              <Space direction="vertical" size="middle">
                <Typography.Title level={3}>
                  {programDetails.Name}
                </Typography.Title>
              </Space>
            </Row>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Space direction="vertical" size="middle">
                  <Row gutter={[16, 16]}>
                    <Text strong>Code:</Text>
                  </Row>
                  <Row gutter={[16, 16]}>
                    <Text>{programDetails.Code}</Text>
                  </Row>
                  <Row gutter={[16, 16]}>
                    <Text strong>Start Date:</Text>
                  </Row>
                  <Row gutter={[16, 16]}>
                    <Text>
                      {moment(programDetails.StartDate).format("DD/MM/YYYY")}
                    </Text>
                  </Row>
                  <Row gutter={[16, 16]}>
                    <Text strong>Description:</Text>
                  </Row>
                  <Row gutter={[16, 16]}>
                    <Text>{programDetails.Description}</Text>
                  </Row>
                </Space>
              </Col>
              <Col span={12}>
                <Space direction="vertical" size="middle">
                  <Row gutter={[16, 16]}>
                    <Text strong>End Date:</Text>
                  </Row>
                  <Row gutter={[16, 16]}>
                    <Text>
                      {moment(programDetails.EndDate).format("DD/MM/YYYY")}
                    </Text>
                  </Row>
                  <Row gutter={[16, 16]}>
                    <Text strong>Created Date:</Text>
                  </Row>
                  <Row gutter={[16, 16]}>
                    <Text>
                      {moment(programDetails.CreatedDate).format("DD/MM/YYYY")}
                    </Text>
                  </Row>
                </Space>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
      <Collapse items={items} defaultActiveKey={['1']} onChange={onChange} />
    </div>
  );
};

export default AdminProgramDetails;
