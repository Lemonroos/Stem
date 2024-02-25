import { Card, Col, Layout, Row } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { News } from '../../models/News';
const { Content } = Layout;

export default function Newsfeed() {
  const newsUrl = 'https://stem-backend.vercel.app/news'
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
    <Layout style={{ height: '100vh', width: '100vw' }}>
      <Content style={{ padding: '2%' }}>
        <Row gutter={16}>
          {news.map(aNews => (
            <Col span={8}>
              <Card title={aNews.Title} bordered={false}
                key={aNews.Id}
                cover={<img alt="news" src={aNews.Image} style={{ height: '30vh' }} />}>
                {aNews.Detail}
              </Card>
            </Col>
          )
          )}
        </Row>
      </Content>
    </Layout>
  )
}
