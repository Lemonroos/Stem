import { Column } from "@ant-design/charts";
import { Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { TeamMember } from "../../models/Members";

const membersInTeamUrl = "https://stem-backend.vercel.app/api/v1/member-in-team";
const TeamDetailsOfTeacher: React.FC = () => {
    const teamId = useParams().teamId;
    const search = useLocation().search;
    const params = new URLSearchParams(search);
    const TeamName = params.get("TeamName");
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])

    async function getTeamMembers() {
        await axios.get(`${membersInTeamUrl}?TeamId=${teamId}`)
            .then((res) => {
                setTeamMembers(res.data);
            })
            .catch(err => {
                console.error(err);
            })
    }
    useEffect(() => {
        getTeamMembers();
    }, []);
    return (
        <div><h1>Team "{TeamName}"</h1>
            {teamMembers.length > 0 ?
                <Table dataSource={teamMembers} rowKey="MemberId" pagination={false}>
                    <Column title="Student Code" dataIndex="StudentCode" key="StudentCode" />
                    <Column title="Full Name" dataIndex="FullName" key="FullName" />
                    <Column title="Class" dataIndex="ClassCode" key="ClassCode" />
                </Table>
                : <>
                    No member found
                </>}
        </div>
    )
}

export default TeamDetailsOfTeacher