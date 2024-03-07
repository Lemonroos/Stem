import { Card, Col, Layout, Row, Typography } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { News } from '../../models/News';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

export default function Newsfeed() {
  const newsUrl = 'https://stem-backend.vercel.app/api/v1/news'
  const [news, setNews] = useState<News[]>([])
  
  function getNews() {
    axios.get(newsUrl)
      .then(data => setNews(data.data))
      .catch(err => console.error(err))
  }
  
  useEffect(() => {
    getNews()
  }, [])
  
  return (
    <Layout style={{ padding: '2%' }}>
      <Content>
        <Title level={1}>Latest News</Title>
        <Row gutter={[16, 16]}>
          {news.map(aNews => (
            <Col xs={24} sm={12} md={8} lg={6}>
              <Card 
                title={aNews.Title} 
                bordered={false}
                key={aNews.Id}
                cover={<img alt="news" src={aNews.Image} style={{ height: '30vh', objectFit: 'cover' }} />}
                hoverable
              >
                <Paragraph ellipsis={{ rows: 3, expandable: true, symbol: 'more' }}>
                  {aNews.Detail}
                </Paragraph>
              </Card>
            </Col>
          ))}
        </Row>
      </Content>
    </Layout>
  );
};
