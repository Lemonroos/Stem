import { Card, Col, Image, Row, Space, Typography } from "antd";
import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MySpin from "../../UI/spin";
import { Programs } from "../../models/Programs";
const { Text } = Typography;

const progUrl = "https://stem-backend.vercel.app/api/v1/programs";

const ProgramDetailsOfManager: React.FC = () => {
    const progId = String(useParams().id);
    const [programDetails, setProgramDetails] = useState<Programs>();
    const [isLoading, setIsLoading] = useState(true);

    async function getProgramById(programId: string) {

        try {
            await axios.get(`${progUrl}/${programId}`)
                .then((response) => {
                    setProgramDetails(response.data);
                    setIsLoading(false);
                })
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getProgramById(progId);
    }, []);

    if (isLoading) {
        return <MySpin />
    } else
        return (
            <div style={{ padding: '24px' }}>
                {programDetails && (
                    <Card>
                        <Row gutter={[16, 16]} style={{ marginBottom: "5%" }}>
                            {/* Column for the image */}
                            <Col span={12}>
                                <Image
                                    src={programDetails.Image}
                                    alt="Program Cover"
                                    width="100%"
                                    height="auto"
                                />
                            </Col>

                            {/* Column for program details */}
                            <Col span={12}>
                                <Row gutter={[16, 16]}>
                                    <Space direction="vertical" size="middle">
                                        <Typography.Title level={3}>{programDetails.Name}</Typography.Title>
                                    </Space>
                                </Row>
                                <Row gutter={[16, 16]}>

                                    <Col span={12}>

                                        <Space direction="vertical" size="middle">
                                            <Row gutter={[16, 16]}>
                                                <Text strong>Code:</Text>
                                            </Row>
                                            <Row gutter={[16, 16]}>
                                                <Text>{programDetails.Code}</Text>  </Row>


                                            <Row gutter={[16, 16]}>
                                                <Text strong>Start Date:</Text>  </Row>
                                            <Row gutter={[16, 16]}>
                                                <Text>{moment(programDetails.StartDate).format("DD/MM/YYYY")}</Text>  </Row>
                                            <Row gutter={[16, 16]}>
                                                <Text strong>Description:</Text>  </Row>
                                            <Row gutter={[16, 16]}>
                                                <Text>{programDetails.Description}</Text>  </Row>

                                        </Space>
                                    </Col>
                                    <Col span={12}>
                                        <Space direction="vertical" size="middle">
                                            <Row gutter={[16, 16]}>
                                                <Text strong>End Date:</Text></Row>
                                            <Row gutter={[16, 16]}>
                                                <Text>{moment(programDetails.EndDate).format("DD/MM/YYYY")}</Text></Row>
                                            <Row gutter={[16, 16]}>
                                                <Text strong>Created Date:</Text></Row>
                                            <Row gutter={[16, 16]}>
                                                <Text>{moment(programDetails.CreatedDate).format("DD/MM/YYYY")}</Text></Row>
                                        </Space>
                                    </Col>

                                </Row>
                            </Col>
                        </Row>
                    </Card>
                )}
            </div>
        );
}
export default ProgramDetailsOfManager