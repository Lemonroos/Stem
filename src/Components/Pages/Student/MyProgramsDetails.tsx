import { Button, Card, Col, Collapse, CollapseProps, Image, Row, Space, Typography } from "antd"; // Import Ant Design components
import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Programs } from "../../models/Programs";
import { Labs } from "../../models/Labs";

const { Text } = Typography;

const MyProgram = () => {
    const progUrl = "https://stem-backend.vercel.app/api/v1/programs";
    const labsInProgramUrl = "https://stem-backend.vercel.app/api/v1/labs/lab-list/labs-in-program?ProgramId=";
    const progId = String(useParams().id);
    const [programDetails, setProgramDetails] = useState<Programs>();
    const [labs, setLabs] = useState<Labs[]>([]);

    async function getProgramById(programId: string) {

        try {
            await axios.get(`${progUrl}/${programId}`)
                .then((response) => {
                    setProgramDetails(response.data);
                })
        } catch (error) {
            console.error(error);
        }
    }

    async function getLabsInProgramm() {
        await axios.get(`${labsInProgramUrl}${progId}`)
            .then(data => {
                setLabs(data.data)
                // console.log(data.data)
            })
    }
    useEffect(() => {
        getProgramById(progId);
        getLabsInProgramm()
    }, []);

    // const onChange = (key: string | string[]) => {
    //     // console.log(key);
    // };
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
                    <br />
                    <Link to={`./labs/${lab.Id}`}>
                        <Button type="primary" block>
                            Details
                        </Button>
                    </Link>
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
            <Collapse items={items} defaultActiveKey={['1']}  />
        </div>
    );
};

export default MyProgram;