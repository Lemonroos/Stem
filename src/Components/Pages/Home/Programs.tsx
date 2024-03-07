// import { Card, Col, Layout, Row, Typography } from 'antd';
// import { useEffect, useState } from 'react';
// import { Programs } from '../../models/Programs';

// const { Content } = Layout;
// const { Title, Paragraph } = Typography;

// export default function ProgramsList() {
//   const progUrl = 'https://stem-backend.vercel.app/api/v1/programs';
//   const [programs, setPrograms] = useState<Programs[]>([]);

//   function getAllPrograms() {
//     fetch(progUrl)
//       .then((res) => res.json())
//       .then((data) => {
//         setPrograms(data);
//       })
//       .catch((error) => {
//         console.error('Error fetching data:', error);
//       })
//   }

//   useEffect(() => {
//     getAllPrograms()
//   }, [])

//   return (
//     <Layout style={{ padding: '2%' }}>
//       <Content>
//         <Title level={1}>Our Programs</Title>
//         <Row gutter={[16, 16]}>
//           {programs.map(program => (
//             <Col xs={24} sm={12} md={8} lg={6} key={program.Id}>
//               <Card 
//                 title={program.Name} 
//                 bordered={false}
//                 cover={<img alt="program" src={program.Image} style={{ height: '30vh', objectFit: 'cover' }} />}
//                 hoverable
//               >
//                 <Paragraph ellipsis={{ rows: 3, expandable: true, symbol: 'more' }}>
//                   {program.Description}
//                 </Paragraph>
//               </Card>
//             </Col>
//           ))}
//         </Row>
//       </Content>
//     </Layout>
//   );
// };
