import { Card, Col, Row } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { Programs } from "../../models/Programs";

import { Link } from "react-router-dom";
import MySpin from "../../UI/spin";
import getUser from "../../../config/auth";
const { Meta } = Card;
export default function AllPrograms() {
    const programsNotBelongToStudentUrl = "https://stem-backend.vercel.app/api/v1/members/available-programs-of-a-student";
    const [userId, setUserId] = useState<any>(null);
    const [programsNotBelongToStudent, setProgramNotBelongToStudent] = useState<Programs[]>([]);
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
    async function getProgramByStudentId() {
        try {
            await axios.get(`${programsNotBelongToStudentUrl}?StudentId=${userId}`)
                .then((res) => {
                    setProgramNotBelongToStudent(res.data);
                })
        } catch (error) {
            console.error("Error fetching programs of student:", error);
        }
    }

    useEffect(() => {
        getProgramByStudentId();
    }, [!isLoading])
    if (isLoading || !programsNotBelongToStudent) {
        return <MySpin />
    } else
        return (
            <div>
                <Row gutter={16}>
                    {programsNotBelongToStudent.map(program => (
                        <Col span={8} key={program.Id}>
                            <Link to={`./details/${program.Id}`}>
                                <Card
                                    hoverable
                                    style={{ width: '100%', height: '100%' }}
                                    cover={<img alt="news" src={program.Image} style={{ height: '30vh', objectFit: 'cover' }} />}
                                >
                                    <Meta
                                        title={program.Name}
                                        description={program.Description}
                                    />
                                </Card>
                            </Link>
                        </Col>
                    ))}
                </Row>
            </div>
        )
}
