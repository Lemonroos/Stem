import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Labs } from "../../models/Labs";
import { Card, Col, Image, Row, Space, Typography } from "antd";
import moment from "moment";

const { Text } = Typography;

function LabsDetail() {
  const labId = String(useParams().id);
  const [labDetail, setLabDetail] = useState<Labs>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>();

  useEffect(() => {
    const fetchLabsDetail = async () => {
      try {
        const response = await axios.get(
          `https://stem-backend.vercel.app/api/v1/labs/${labId}`
        );
        setLabDetail(response.data);
        setIsLoading(false);
      } catch (error: any) {
        console.error("Error fetching lab details:", error);
        setError(error.response.data.error);
        setIsLoading(false);
      }
    };
    fetchLabsDetail();
  }, [labId]);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  if (!labDetail) {
    return <div>Lab details not found</div>;
  }
  return (
    <div style={{ padding: "24px" }}>
      <Card>
        <Row gutter={[16, 16]} style={{ marginBottom: "5%" }}>
          <Col>
            <Image
              src={labDetail.Image}
              alt="Lab cover"
              height="auto"
              width="100%"
            />
          </Col>         
          <Col span={12}>
          <Row gutter={[16, 16]}>
              <Space direction="vertical" size="middle">
                <Typography.Title level={3}>
                  {labDetail.Topic}
                </Typography.Title>
              </Space>
            </Row>            
          </Col>
          <Row gutter={[16, 16]}>
              <Col span={12}>
                <Space direction="vertical" size="middle">
                  <Row gutter={[16, 16]}>
                    <Text strong>Code:</Text>
                  </Row>
                  <Row gutter={[16, 16]}>
                    <Text>{labDetail.Code}</Text>
                  </Row>
                  <Row gutter={[16, 16]}>
                    <Text strong>Start Date:</Text>
                  </Row>
                  <Row gutter={[16, 16]}>
                    <Text>
                      {moment(labDetail.StartDate).format("DD/MM/YYYY")}
                    </Text>
                  </Row>
                  <Row gutter={[16, 16]}>
                    <Text strong>Description:</Text>
                  </Row>
                  <Row gutter={[16, 16]}>
                    <Text>{labDetail.Description}</Text>
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
                      {moment(labDetail.EndDate).format("DD/MM/YYYY")}
                    </Text>
                  </Row>
                  <Row gutter={[16, 16]}>
                    <Text strong>Created Date:</Text>
                  </Row>
                  <Row gutter={[16, 16]}>
                    <Text>
                      {moment(labDetail.CreatedDate).format("DD/MM/YYYY")}
                    </Text>
                  </Row>
                </Space>
              </Col>
            </Row>        
        </Row>
      </Card>
    </div>
  );
}
export default LabsDetail;
