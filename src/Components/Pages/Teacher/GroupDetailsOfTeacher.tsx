import { Button, Card, Collapse, Form, Input, Modal, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Groups } from "../../models/Groups";
import { MembersInGroup, MembersNotInGroup } from "../../models/Members";
import MySpin from "../../UI/spin";
import { Teams } from "../../models/Teams";
const { Panel } = Collapse;
const { Column } = Table;

const groupUrl = "https://stem-backend.vercel.app/api/v1/groups";
const membersInGroupUrl = "https://stem-backend.vercel.app/api/v1/members/member-in-group";
const memberUrl = "https://stem-backend.vercel.app/api/v1/members";
const teamInGroupUrl = "https://stem-backend.vercel.app/api/v1/teams/team-in-group";
const createTeamUrl = "https://stem-backend.vercel.app/api/v1/teams/create";
const GroupDetailsOfTeacher: React.FC = () => {
    const programId = useParams().programId
    const groupId = useParams().groupId;
    const search = useLocation().search;
    const params = new URLSearchParams(search);
    const SchoolId = params.get("SchoolId");
    const [isLoading, setIsLoading] = useState(true);
    const [groupInfo, setGroupInfo] = useState<Groups | null>(null);
    const [groupMembers, setGroupMembers] = useState<MembersInGroup[]>([]);
    const [teams, setTeams] = useState<Teams[]>([]);
    const [createTeamVisible, setCreateTeamVisible] = useState(false);

    const [teamName, setTeamName] = useState<string | undefined>();
    const openCreateTeamModal = () => {
        setCreateTeamVisible(true);
    };
    async function getGroupInfo() {
        try {
            await axios.get(`${groupUrl}/${groupId}`)
                .then((response) => {
                    setGroupInfo(response.data);
                    setIsLoading(false);
                })
        } catch (error) {
            console.error(error);
        }
    }
    async function getGroupMembers() {
        try {
            await axios.get(`${membersInGroupUrl}?GroupId=${groupId}`)
                .then((response) => {
                    setGroupMembers(response.data);
                    setIsLoading(false);
                })
        } catch (error) {
            console.error(error);
        }
    }
    async function getTeamsInGroup() {
        try {
            await axios.get(`${teamInGroupUrl}?GroupId=${groupId}`)
                .then((response) => {
                    setTeams(response.data);
                    setIsLoading(false);
                })
        } catch (error) {
            console.error(error);
        }
    }
    async function createNewTeam() {
        try {
            const data = {
                TeamName: teamName,
                Members: 6,
            }
            await axios.post(`${createTeamUrl}?GroupId=${groupId}`, data)
                .then((response) => {
                    console.log(response);
                    alert('Team created successfully');
                    window.location.reload();
                })
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getGroupInfo();
        getGroupMembers();
        getTeamsInGroup();
    }, []);
    if (isLoading) {
        return <MySpin />
    } else
        return (
            <div>
                <h1>Details of group {groupInfo?.GroupCode}</h1>
                <strong>Group Name:</strong> "{groupInfo?.GroupName}" -
                <strong>Teacher:</strong> {groupInfo?.TeacherName}
                <br />
                <div>
                    <Collapse accordion>
                        <Panel header="Members" key="1">
                            {groupMembers.length > 0 ?
                                <Table dataSource={groupMembers} rowKey="Id" pagination={false}>
                                    <Column title="Full Name" dataIndex="FullName" key="FullName" />
                                    <Column title="Student Code" dataIndex="StudentCode" key="StudentCode" />
                                </Table>
                                : <>
                                    No member found
                                </>}
                        </Panel>
                    </Collapse>
                </div>
                <Card>
                    {teams.map(team => (
                        <Button>{team.TeamName}</Button>
                    )
                    )}
                </Card>
                <Button block onClick={openCreateTeamModal}>
                    Create a new team
                </Button>

                <Modal
                    title="Create New Group"
                    visible={createTeamVisible}
                    onCancel={() => setCreateTeamVisible(false)}
                    footer={null} // Hide default footer buttons
                >

                    {/* Add your content for the modal here */}
                    <Form layout="vertical">
                        <Form.Item label="Name of the new team" required>
                            <Input required
                                value={teamName}
                                placeholder="Group Name"
                                onChange={(e) => setTeamName(e.target.value)}
                            />
                        </Form.Item>
                        <Button block type="primary" onClick={createNewTeam}>Create team</Button>
                    </Form>
                </Modal>
            </div>
        )
}
export default GroupDetailsOfTeacher;