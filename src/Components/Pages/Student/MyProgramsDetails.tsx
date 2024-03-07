import { Card, Col, Collapse, CollapseProps, Image, Row, Space, Typography } from "antd"; // Import Ant Design components
import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Programs } from "../../models/Programs";
import { Labs } from "../../models/Labs";

const { Text } = Typography;

const MyPrograms = () => {
    const progUrl = "https://stem-backend.vercel.app/api/v1/programs";
    const labsUrl = "https://stem-backend.vercel.app/api/v1/labs";
    const progId = Number(useParams().id);
    const [programDetails, setProgramDetails] = useState<Programs | undefined>();
    const [labs, setLabs] = useState<Labs[]>([]);

    async function getProgramById(id: number) {
        try {
            const response = await axios.get(`${progUrl}/${id}`);
            setProgramDetails(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    async function getLabsInProgramm() {
        await axios.get(labsUrl)
            .then(data => {
                setLabs(data.data)
            })
    }
    useEffect(() => {
        getProgramById(progId);
        getLabsInProgramm()
    }, [progId]);

    const onChange = (key: string | string[]) => {
        console.log(key);
    };
    const items: CollapseProps['items'] = [];
    labs.forEach((lab) => {
        items.push({
            key: lab.Id,
            label: lab.Code,
            children:
                <div>
                    <strong>Topic</strong>
                    <p>{lab.Topic}</p>
                    <strong>Description</strong>
                    <p>{lab.Description}</p>
                </div>
        })
    })
    return (
        <div style={{ padding: '24px' }}>
            {programDetails && (
                <Card>
                    <Row gutter={[16, 16]}>
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
                                        {/* <Row gutter={[16, 16]}>
                                            <Text strong>School Year ID:</Text></Row>
                                        <Row gutter={[16, 16]}>
                                            <Text>{programDetails.SchoolYearId}</Text></Row> */}


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
            <Collapse items={items} defaultActiveKey={['1']} onChange={onChange} />
        </div>
    );
};

export default MyPrograms;