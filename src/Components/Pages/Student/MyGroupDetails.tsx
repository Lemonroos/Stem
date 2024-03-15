import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Spin, Typography, Collapse } from 'antd';
import { useParams } from 'react-router-dom';

const { Title, Text } = Typography;
const { Panel } = Collapse;

interface GroupDetail {
  Id: number;
  GroupCode: string;
  GroupName: string;
  TeacherId: number;
  ProgramId: number;
  TeacherCode: string;
  TeacherName: string;
  ProgramCode: string;
  ProgramName: string;
}

interface Member {
  Id: number;
  GroupId: number;
  GroupCode: string;
  Name: string;
  SchoolId: number;
  StudentId: number;
  StudentCode: string;
  FullName: string;
}

const MyGroupsDetails: React.FC = () => {
  const [groupDetail, setGroupDetail] = useState<GroupDetail | null>(null);
  const [members, setMembers] = useState<Member[] | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchGroupDetail = async () => {
      try {
        const response = await axios.get(`https://stem-backend.vercel.app/api/v1/groups/${id}`);
        setGroupDetail(response.data);
      } catch (error) {
        console.error("Error fetching group details:", error);
      }
    };

    fetchGroupDetail();
  }, [id]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get(`https://stem-backend.vercel.app/api/v1/members/member-in-group?GroupId=${id}`);
        setMembers(response.data);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    fetchMembers();
  }, [id]);

  if (!groupDetail || !members) {
    return <Spin size="large" />;
  }

  return (
    <div>
      <Card title="My Group Detail" style={{ width: 300 }}>
        <Title level={4}>Group Code: <Text type="secondary">{groupDetail.GroupCode}</Text></Title>
        <Title level={4}>Group Name: <Text type="secondary">{groupDetail.GroupName}</Text></Title>
        <Title level={4}>Teacher Code: <Text type="secondary">{groupDetail.TeacherCode}</Text></Title>
        <Title level={4}>Teacher Name: <Text type="secondary">{groupDetail.TeacherName}</Text></Title>
        <Title level={4}>Program Code: <Text type="secondary">{groupDetail.ProgramCode}</Text></Title>
        <Title level={4}>Program Name: <Text type="secondary">{groupDetail.ProgramName}</Text></Title>
      </Card>
      <Collapse accordion>
        {members.map((member) => (
          <Panel header={member.FullName} key={member.Id}>
            <p>Student Code: {member.StudentCode}</p>
            <p>Group Code: {member.GroupCode}</p>
            <p>Group Name: {member.Name}</p>
          </Panel>
        ))}
      </Collapse>
    </div>
  );
};

export default MyGroupsDetails;
