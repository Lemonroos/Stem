import { Column } from '@ant-design/charts';
import { Card, Col, Progress, Row, Statistic, Typography } from "antd";
import React, { useEffect, useState } from "react";
import getUser from "../../../config/auth";
import MySpin from "../../UI/spin";
import { News } from "../../models/News";
import { fetchAllPrograms, fetchNews, fetchProgramsByStudent, fetchSchoolYears } from './StudentFetching';
const { Title } = Typography;


const StudentDashboard: React.FC = () => {
  // const [userId, setUserId] = useState<any>(null);
  const [news, setNews] = useState<News[]>([]);
  const [schoolYears, setSchoolYears] = useState<any[]>([]);
  const [programs, setPrograms] = useState<any[]>([]);
  const [allPrograms, setAllPrograms] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getUser();
        // setUserId(user.userId);

        const [newsData, schoolYearsData, programsData, allProgramsData] = await Promise.all([
          fetchNews(),
          fetchSchoolYears(),
          fetchProgramsByStudent(user.userId),
          fetchAllPrograms(),
        ]);

        setNews(newsData);
        setSchoolYears(schoolYearsData);
        setPrograms(programsData);
        setAllPrograms(allProgramsData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
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
