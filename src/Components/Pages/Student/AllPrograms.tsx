import axios from "axios";
import { Programs } from "../../models/Programs";
import { useEffect, useState } from "react";
import { Card, Col, Row } from "antd";
import { Link } from "react-router-dom";

export default function AllPrograms() {
    const progUrl = "https://stem-backend.vercel.app/api/v1/programs";

    const [programs, setPrograms] = useState<Programs[]>([]);

    async function getAllPrograms() {
        await axios.get(progUrl)
            .then(data => setPrograms(data.data))
            .catch(err => console.error(err));
    }
    useEffect(() => {
        getAllPrograms()
    }, [])
    return (
        <div>
            <Row gutter={30}>
                {programs.map(program => (
                    <Col span={8} key={program.Id}>
                        <Card
                            title={<Link to={`./details/${program.Id}`}>{program.Name}</Link>}
                            bordered={false}
                            cover={<img alt="news" src={program.Image} style={{ height: '30vh' }} />}>
                            {program.Description}
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    )
}
