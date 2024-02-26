import { Card, Col, Layout, Row } from "antd";
import { Content } from "antd/es/layout/layout";
import { useEffect, useState } from "react";
import { Programs } from "../../models/Programs";

export default function ProgramsList() {
  const progUrl = "https://stem-backend.vercel.app/api/v1/programs";

  const [programs, setPrograms] = useState<Programs[]>([]);

  function getAllPrograms() {
    fetch(progUrl)
      .then((res) => res.json()) // Parse the response as JSON
      .then((data) => {
        setPrograms(data); // Log the data to the console
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      })
  }
  useEffect(() => {
    getAllPrograms()
  }, [])
  return (
    <Layout style={{ height: '100vh', width: '100vw' }}>
      <Content style={{ padding: '2%' }}>
        <Row gutter={16}>
          {programs.map(program => (
            <Col span={8} key={program.Id}>
              <Card title={program.Name} bordered={false}
                
                cover={<img alt="news" src={program.Image} style={{height:'30vh'}} />}>
                {program.Description}
              </Card>
            </Col>
          )
          )}
        </Row>
      </Content>
    </Layout>
  )
}
