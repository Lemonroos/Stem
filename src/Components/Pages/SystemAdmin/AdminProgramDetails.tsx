import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Programs } from "../../models/Programs";
import MySpin from "../../UI/spin";
import { Button, Card, Col, Image, Row, Space, Typography } from "antd";
import moment from "moment";
import DeleteProgram from "./DeleteProgram";

const { Text } = Typography;

const AdminProgramDetails: React.FC = () => {
    const programId = String(useParams().id);
    const [programDetails, setProgramDetails] = useState<Programs | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [open, setOpen] = useState(false);

    const showModal = () => {
      setOpen(true);
    };

    useEffect(() => {
        const fetchProgramDetails = async () => {
            try {
                const response = await axios.get(`https://stem-backend.vercel.app/api/v1/programs/${programId}`);
                setProgramDetails(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching program details:", error);
                setError("Error fetching program details. Please try again later.");
                setIsLoading(false);
            }
        };
        fetchProgramDetails();
    }, [programId]);

    if (isLoading) {
        return <MySpin />;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!programDetails) {
        return <div>Program details not found</div>;
    }

    return (
        <div style={{ padding: '24px' }}>
            <Button type="primary" onClick={showModal} style={{ marginBottom: 16 }}>
                Delete Program
            </Button>
            <DeleteProgram open={open} setOpen={setOpen}/>
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
                                        <Text>{programDetails.Code}</Text>
                                    </Row>
                                    <Row gutter={[16, 16]}>
                                        <Text strong>Start Date:</Text>
                                    </Row>
                                    <Row gutter={[16, 16]}>
                                        <Text>{moment(programDetails.StartDate).format("DD/MM/YYYY")}</Text>
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
                                        <Text>{moment(programDetails.EndDate).format("DD/MM/YYYY")}</Text>
                                    </Row>
                                    <Row gutter={[16, 16]}>
                                        <Text strong>Created Date:</Text>
                                    </Row>
                                    <Row gutter={[16, 16]}>
                                        <Text>{moment(programDetails.CreatedDate).format("DD/MM/YYYY")}</Text>
                                    </Row>
                                </Space>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Card>
        </div>
    );
};

export default AdminProgramDetails;
