import { Card, Col, List, Row, Tabs } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Labs } from "../../models/Labs";
import TabPane from "antd/es/tabs/TabPane";

const LabDetails: React.FC = () => {
    const labByIdUrl = 'https://stem-backend.vercel.app/api/v1/labs';
    // const progId = String(useParams().programId);
    const labId = String(useParams().labId);
    const [lab, setLab] = useState<Labs>()
    async function getLabsInProgramm() {
        await axios.get(`${labByIdUrl}/${labId}`)
            .then(data => {
                setLab(data.data)
            })
    }
    useEffect(() => {
        getLabsInProgramm()
    }, []);

    const groupData = [
        {
            title: '4 (6 students) - Your team',
            // ... other group data
        },
        // ... more groups
    ];
    
    return (
        <div>
            <h1>Lab #{lab?.Id}: {lab?.Topic}</h1>
            <Card hoverable style={{ width: '100%', borderRadius: '20px', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)' }}>
                <Row>
                    <Col span={12} style={{ textAlign: 'center' }}>
                        <img src={lab?.Image} alt="LabImage" style={{ width: '80%', borderRadius: '10px' }} />
                    </Col>
                    <Col span={12}>
                        <Card.Meta title="Description" description={lab?.Description} />
                    </Col>
                </Row>
            </Card>

            <Tabs defaultActiveKey="1">
                <TabPane tab="TEAM" key="1">
                    <List
                        itemLayout="horizontal"
                        dataSource={groupData}
                        renderItem={item => (
                            <List.Item>
                                <Card title={item.title}>
                                    {/* Additional group details here */}
                                </Card>
                            </List.Item>
                        )}
                    />
                </TabPane>
                <TabPane tab="SUBMISSION" key="2">
                    {/* SUBMISSION content */}
                </TabPane>
                <TabPane tab="GRADE" key="3">
                    {/* GRADE content */}
                </TabPane>
                <TabPane tab="TEACHER'S MESSAGE" key="4">
                    {/* Teacher's message content */}
                </TabPane>
            </Tabs>
        </div>
    )
}
export default LabDetails