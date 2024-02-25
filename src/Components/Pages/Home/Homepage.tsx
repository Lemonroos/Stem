import { Card, Col, Layout, Row } from 'antd';
const { Content } = Layout;

export default function Homepage() {
    return (
        <Layout style={{ height: '100vh', width: '100vw' }}>
            <Content style={{ padding: '2%' }}>
                <Row gutter={16}>
                    {/* {news.map()} */}
                    <Col span={8}>
                        <Card title="Card title" bordered={false}>
                            Card content
                        </Card>
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
};