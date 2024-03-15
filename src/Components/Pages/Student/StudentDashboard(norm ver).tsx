import React, { useEffect, useState } from "react";
import axios from "axios";
import { News } from "../../models/News";
import { Card, Col, Row, Statistic, Progress, Typography } from "antd";
import { Column } from '@ant-design/charts';
import getUser from "../../../config/auth";
import MySpin from "../../UI/spin";

const { Title } = Typography;
const newsUrl = 'https://stem-backend.vercel.app/api/v1/news';
const schoolYearUrl = 'https://stem-backend.vercel.app/api/v1/school-year';
const programsByStudentUrl = 'https://stem-backend.vercel.app/api/v1/members/programs-of-a-student';
const allProgramsUrl = 'https://stem-backend.vercel.app/api/v1/programs';

const StudentDashboard: React.FC = () => {
  const [userId, setUserId] = useState<any>(null);
  const [news, setNews] = useState<News[]>([]);
  const [schoolYears, setSchoolYears] = useState<any[]>([]);
  const [programs, setPrograms] = useState<any[]>([]);
  const [allPrograms, setAllPrograms] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      const resObject = await getUser();
      setUserId(resObject.userId);
      setIsLoading(false);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    async function fetchSchoolYears() {
      try {
        const response = await axios.get(schoolYearUrl);
        setSchoolYears(response.data);
      } catch (error) {
        console.error("Error fetching school years:", error);
      }
    };
    fetchSchoolYears();
  }, []);

  useEffect(() => {
    async function fetchPrograms() {
      try {
        const response = await axios.get(`${programsByStudentUrl}?StudentId=${userId}`);
        setPrograms(response.data);
      } catch (error) {
        console.error("Error fetching programs:", error);
      }
    };
    fetchPrograms();
  }, [userId]);

  useEffect(() => {
    async function fetchAllPrograms() {
      try {
        const response = await axios.get(allProgramsUrl);
        setAllPrograms(response.data);
      } catch (error) {
        console.error("Error fetching all programs:", error);
      }
    };
    fetchAllPrograms();
  }, []);

  useEffect(() => {
    async function fetchNews() {
      try {
        const response = await axios.get(newsUrl);
        setNews(response.data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };
    fetchNews();
  }, []);

  // Prepare data for the column chart
  const data = schoolYears.map(schoolYear => {
    const year = new Date(schoolYear.StartDate).getFullYear();
    const count = programs.filter(program => program.SchoolYearId === schoolYear.Id).length;
    return { year, count };
  });

  const config = {
    data,
    height: 400,
    xField: 'year',
    yField: 'count',
    yAxis: {
      tickCount: Math.max(...data.map(item => item.count)) + 1,
    },
  };

  const totalPrograms = allPrograms.length;
  const enrolledPrograms = programs.length;
  const progress = Math.round((enrolledPrograms / totalPrograms) * 100);

  if (isLoading || !news || !schoolYears || !programs || !allPrograms) {
    return <MySpin />
  } else
    return (
      <>
        <Title level={2}>Student Dashboard</Title>
        <Row gutter={16}>
          <Col span={12}>
            <Statistic title="Total Programs" value={totalPrograms} />
          </Col>
          <Col span={12}>
            <Statistic title="Enrolled Programs" value={enrolledPrograms} />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Progress percent={progress} status="active" />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Column {...config} />
          </Col>
        </Row>
        <Row gutter={16}>
          {news.map((aNews) => (
            <Col span={8} key={aNews.Id}>
              <Card
                hoverable
                style={{ width: '100%', height: '100%' }}
                cover={<img alt={aNews.Title} src={aNews.Image} style={{ height: '30vh', objectFit: 'cover' }} />}
              >
                <Card.Meta
                  title={aNews.Title}
                  description={aNews.Detail}
                />
              </Card>
            </Col>
          ))}
        </Row>
      </>
    );
};

export default StudentDashboard;
