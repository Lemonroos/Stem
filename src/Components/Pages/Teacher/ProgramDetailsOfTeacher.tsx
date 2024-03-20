import { Button, Card, Col, Image, Row, Space, Typography } from "antd"
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Programs } from "../../models/Programs";
import MySpin from "../../UI/spin";
import moment from "moment";
import { Groups } from "../../models/Groups";
import getUser from "../../../config/auth";
const { Text } = Typography;

const progUrl = "https://stem-backend.vercel.app/api/v1/programs";
const groupsOfTeacherUrl = "https://stem-backend.vercel.app/api/v1/groups/group-list/groups-of-a-teacher";
const ProgramDetailsOfTeacher: React.FC = () => {
    const progId = useParams().programId;
    const [userId, setUserId] = useState<any>(null);
    const [programDetails, setProgramDetails] = useState<Programs>();
    const [myGroups, setMyGroups] = useState<Groups[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            const resObject = await getUser();
            setUserId(resObject.userId);
        };
        fetchUser();
    }, []);
    async function getProgramById() {
        try {
            await axios.get(`${progUrl}/${progId}`)
                .then((response) => {
                    setProgramDetails(response.data);
                    setIsLoading(false);
                })
        } catch (error) {
            console.error(error);
        }
    }
    async function getGroupsOfATeacher() {
        try {
            await axios.get(`${groupsOfTeacherUrl}?ProgramId=${progId}&TeacherId=${userId}`)
                .then((response) => {
                    setMyGroups(response.data);
                    setIsLoading(false);
                })
        } catch (error) {
            console.error(error);
        }
    }


    useEffect(() => {
        getProgramById();
        getGroupsOfATeacher();
    }, [userId])
    if (isLoading) {
        return <MySpin />
    } else
        return (
            <div>
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
                <Card>
                    <h1>My Groups</h1>
                    {myGroups.map(myGroup => (
                        <Link to={`./groups/${myGroup.Id}`}>
                            <Button block>{myGroup.GroupCode}</Button>
                        </Link>
                    ))
                    }
                </Card>
            </div>
        )
}

export default ProgramDetailsOfTeacher