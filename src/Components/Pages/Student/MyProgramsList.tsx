import { Card, Col, Row } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Programs } from "../../models/Programs";

const { Meta } = Card;

const MyProgramList = () => {
    const progUrl = 'https://stem-backend.vercel.app/api/v1/programs';
    const groupUrl = 'https://stem-backend.vercel.app/api/v1/groups';
    const studentGroupIds = [1, 2];
    const [studentProgramIds, setStudentProgramIds] = useState<number[]>([]);
    const [myPrograms, setMyPrograms] = useState<Programs[]>([]);
    // const [myGroups, setMyGroups] = useState<Groups[]>([]);

    async function getProgramIdByGroupId(groupId: number) {
        try {
            const response = await axios.get(`${groupUrl}/${groupId}`);
            const programId = response.data.ProgramId;
            setStudentProgramIds(studentProgramIds => [...studentProgramIds, programId]);
        } catch (error) {
            console.error("Error fetching programs:", error);
        }
    }
    async function getProgramByProgramId(progId: number) {
        try {
            const response = await axios.get(`${progUrl}/${progId}`);
            const data = response.data;
            setMyPrograms(prevPrograms => [...prevPrograms, data]);
        } catch (error) {
            console.error("Error fetching programs:", error);
        }
    }

    useEffect(() => {
        for (const groupId of studentGroupIds) {
            getProgramIdByGroupId(groupId);
        }
    }, []);
    useEffect(() => {
        for (const progId of studentProgramIds) {
            getProgramByProgramId(progId);
        }
    }, [studentProgramIds]);

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
