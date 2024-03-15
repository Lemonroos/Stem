import axios from "axios";
import { Programs } from "../../models/Programs";
import { useEffect, useState } from "react";
import { Card, Col, Row } from "antd";
import { Link } from "react-router-dom";
import MySpin from "../../UI/spin";

export default function AllPrograms() {
    const progUrl = "https://stem-backend.vercel.app/api/v1/programs";

    const [programs, setPrograms] = useState<Programs[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    async function getAllPrograms() {
        await axios.get(progUrl)
            .then(data => {
                setPrograms(data.data)
                setIsLoading(false);
            })
            .catch(err => console.error(err));
    }
    useEffect(() => {
        getAllPrograms()
    }, [])
    if (isLoading || !programs) {
        return <MySpin />
    } else
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
