import { Card, Col, Row } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { Programs } from "../../models/Programs";

import { Link } from "react-router-dom";
import MySpin from "../../UI/spin";
const { Meta } = Card;
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
                <Row gutter={16}>
                    {programs.map(program => (
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
