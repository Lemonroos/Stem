import { Card, Col, Layout, Row, Typography } from 'antd';
// import axios from 'axios';
// import { useEffect, useState } from 'react';

const { Header, Footer, Content } = Layout;
const { Title } = Typography;

export default function Homepage() {
    // const newsUrl = 'https://stem-backend.vercel.app/news'
    // const [news, setNews] = useState<News[]>([])

    // function getNews() {
    //     axios.get(newsUrl)
    //         .then(res => res.json())
    //         .then(data => setNews(data))
    //         .catch(err => console.log(err))
    // }
    // useEffect(() => {
    //     getNews()
    // }, [])
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