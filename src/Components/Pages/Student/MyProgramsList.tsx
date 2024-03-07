import { Card, Col, Row } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Programs } from "../../models/Programs";

const { Meta } = Card;

const MyProgramList = () => {
    const progamsByStudentUrl = 'https://stem-backend.vercel.app/api/v1/members/programs-of-a-student';
    const studentId = 1;
    const [myPrograms, setMyPrograms] = useState<Programs[]>([]);
    async function getProgramByStudentId(studentId: number) {
        try {
            await axios.get(`${progamsByStudentUrl}?StudentId=${studentId}`)
                .then((res) => {
                    setMyPrograms(res.data);
                })
        } catch (error) {
            console.error("Error fetching programs:", error);
        }
    }
    useEffect(() => {
        getProgramByStudentId(studentId); // Wait for the promise to resolve
    }, []);

    return (
        <div>
            <Row gutter={[16, 16]}>
                {myPrograms.map((myProgram) => (
                    <Col key={myProgram.Id} xs={24} sm={12} md={8} lg={6}>
                        <Card
                            cover={<img alt={myProgram.Name} src={myProgram.Image} />}
                            style={{ height: "100%", overflow: "hidden" }}
                            bordered={false}
                            hoverable
                        >
                            <Meta
                                title={<Link to={`./details/${myProgram.Id}`}>{myProgram.Name}</Link>}
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
