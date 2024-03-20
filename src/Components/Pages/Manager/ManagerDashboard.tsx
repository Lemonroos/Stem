import React, { useEffect, useState } from "react";
import axios from "axios";
import { News } from "../../models/News";
import { Card } from "antd";

const newsUrl = 'https://stem-backend.vercel.app/api/v1/news';

const ManagerDashboard: React.FC = () => {
  const [news, setNews] = useState<News[]>([]);

  useEffect(() => {
    async function fetchNews() {
      try {
        const response = await axios.get(newsUrl);
        setNews(response.data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    }

    fetchNews();
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <>
      <h1>Manager Dashboard</h1>
      {news.map((aNews) => (
        <Card
          key={aNews.Id}
          title={aNews.Title}
          bordered={false}
          cover={<img alt="news" src={aNews.Image} style={{ height: '30vh' }} />}
        >
          {aNews.Detail}
        </Card>
      ))}
    </>
  );
};

export default ManagerDashboard;
