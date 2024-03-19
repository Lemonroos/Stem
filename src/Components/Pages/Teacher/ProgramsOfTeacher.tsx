import { Card, Col, Row } from "antd";
import Meta from "antd/es/card/Meta";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import getUser from "../../../config/auth";
import MySpin from "../../UI/spin";
import { ProgramsOfATeacher } from "../../models/Programs";

const programsOfTeacherUrl = "https://stem-backend.vercel.app/api/v1/programs/program-list/programs-of-a-teacher";

const ProgramsOfTeacher: React.FC = () => {
    const [userId, setUserId] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [myPrograms, setMyPrograms] = useState<ProgramsOfATeacher[]>([]);
    useEffect(() => {
        const fetchUser = async () => {
            const resObject = await getUser();
            setUserId(resObject.userId);
        };
        fetchUser();
    }, []);
    async function getProgramsByTeacherId() {
        await axios.get(`${programsOfTeacherUrl}?TeacherId=${userId}`)
            .then((res) => {
                setMyPrograms(res.data);
                setIsLoading(false);
            })
    }
    useEffect(() => {
        getProgramsByTeacherId()
    }, [userId])
    if (isLoading) {
        return <MySpin />
    } else
        return (
            <div>
                <Row gutter={[16, 16]}>
                    {myPrograms.map((myProgram) => (
                        <Col key={myProgram.ProgramId} xs={24} sm={12} md={8} lg={6}>
                            <Link to={`./details/${myProgram.ProgramId}`}>
                                <Card
                                    cover={<img alt={myProgram.Name} src={myProgram.Image} />}
                                    style={{ height: "100%", overflow: "hidden" }}
                                    bordered={false}
                                    hoverable
                                >
                                    <Meta
                                        title={myProgram.Name}
                                        description={myProgram.Description}
                                    />
                                </Card>
                            </Link>
                        </Col>
                    ))}
                </Row>
            </div>
        )
}

export default ProgramsOfTeacher