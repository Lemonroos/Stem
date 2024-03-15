import { Card, Col, Row } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import getUser from "../../../config/auth";
import { ProgramAndGroup } from "../../models/Programs";
import MySpin from "../../UI/spin";

const { Meta } = Card;

const MyProgramList = () => {
    const [userId, setUserId] = useState<any>(null);
    const [myPrograms, setMyPrograms] = useState<ProgramAndGroup[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchUser = async () => {
            const resObject = await getUser();
            setUserId(resObject.userId);
            setIsLoading(false);
        };
        fetchUser();
        // setUser(JSON.parse(localStorage.getItem('user')));
    }, []);
    // const studentId = userId;
    console.log(userId);
    const progamsByStudentUrl = 'https://stem-backend.vercel.app/api/v1/members/programs-of-a-student';
    async function getProgramByStudentId() {
        try {
            await axios.get(`${progamsByStudentUrl}?StudentId=${userId}`)
                .then((res) => {
                    setMyPrograms(res.data);
                    setIsLoading(false);
                })
        } catch (error) {
            console.error("Error fetching programs:", error);
        }
    }

    useEffect(() => {
        getProgramByStudentId();
    }, [!isLoading]);

    if (isLoading || !myPrograms) {
        return <MySpin />
    } else
        return (
            <div>
                <Row gutter={[16, 16]}>
                    {myPrograms.map((myProgram) => (
                        <Col key={myProgram.Id} xs={24} sm={12} md={8} lg={6}>
                            <Card
                                cover={<img alt={myProgram.ProgramName} src={myProgram.Image} />}
                                style={{ height: "100%", overflow: "hidden" }}
                                bordered={false}
                                hoverable
                            >
                                <Meta
                                    title={<Link to={`./details/${myProgram.Id}`}>{myProgram.ProgramName}</Link>}
                                    description={myProgram.Description}
                                />
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        );
};

export default MyProgramList;
