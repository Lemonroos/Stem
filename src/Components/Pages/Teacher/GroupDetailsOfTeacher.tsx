import { Button, Card, Collapse, Form, Input, Modal, Select, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import MySpin from "../../UI/spin";
import { Groups } from "../../models/Groups";
import { MembersInGroup, TeamMember } from "../../models/Members";
import { Teams } from "../../models/Teams";
const { Panel } = Collapse;
const { Column } = Table;
const { Option } = Select;

const groupUrl = "https://stem-backend.vercel.app/api/v1/groups";
const membersInGroupUrl = "https://stem-backend.vercel.app/api/v1/members/member-in-group";
const teamInGroupUrl = "https://stem-backend.vercel.app/api/v1/teams/team-in-group";
const createTeamUrl = "https://stem-backend.vercel.app/api/v1/teams/create";
const membersNotInTeamUrl = "https://stem-backend.vercel.app/api/v1/members/members-not-in-team";
const membersInTeamUrl = "https://stem-backend.vercel.app/api/v1/member-in-team";
const GroupDetailsOfTeacher: React.FC = () => {
    const groupId = useParams().groupId;
    const [isLoading, setIsLoading] = useState(true);
    const [groupInfo, setGroupInfo] = useState<Groups | null>(null);
    const [groupMembers, setGroupMembers] = useState<MembersInGroup[]>([]);
    const [teams, setTeams] = useState<Teams[]>([]);
    const [membersNotInTeam, setMembersNotInTeam] = useState<TeamMember[]>([]);
    const [createTeamVisible, setCreateTeamVisible] = useState(false);
    const [addToExistingTeamVisible, setAddToExistingTeamVisible] = useState(false);
    const [teamName, setTeamName] = useState<string | undefined>();
    const [selectedTeamId, setSelectedTeamId] = useState<number | null>(null)

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
    async function getMembersNotInTeam() {
        try {
            await axios.get(`${membersNotInTeamUrl}?GroupId=${groupId}`)
                .then((response) => {
                    setMembersNotInTeam(response.data);
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

    const openAddToExistingTeamModal = () => {
        setAddToExistingTeamVisible(true);
    };
    const handleTeamChange = (value: number) => {
        setSelectedTeamId(value);
        console.log(value);
    };

    async function addStudentsIntoTeam() {
        membersNotInTeam.forEach(student => {
            axios.post(`${membersInTeamUrl}?MemberId=${student.MemberId}`, {
                TeamId: selectedTeamId,
            }).then(() => {
                alert('Student ' + student.FullName + ' is added into the team');
                window.location.reload();
            })
                .catch(err => {
                    console.error(err)
                    alert(err.response.data.error);
                });
        });
    }
    useEffect(() => {
        getGroupInfo();
        getGroupMembers();
        getTeamsInGroup();
        getMembersNotInTeam();
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
                        <Panel header="Group Members" key="1">
                            {groupMembers.length > 0 ?
                                <Table dataSource={groupMembers} rowKey="Id" pagination={false}>
                                    <Column title="Student Code" dataIndex="StudentCode" key="StudentCode" />
                                    <Column title="Full Name" dataIndex="FullName" key="FullName" />
                                </Table>
                                : <>
                                    No member found
                                </>}
                        </Panel>
                    </Collapse>
                </div>
                <div>
                    <Collapse accordion>
                        <Panel header="Members not in Team" key="1">
                            {membersNotInTeam.length > 0 ?
                                <>
                                    <Table dataSource={membersNotInTeam} rowKey="Id" pagination={false}>
                                        <Column title="Student Code" dataIndex="StudentCode" key="StudentCode" />
                                        <Column title="Full Name" dataIndex="FullName" key="FullName" />
                                        <Column title="Class" dataIndex="ClassCode" key="ClassCode" />
                                    </Table>
                                    <Button block type="primary"
                                        onClick={openAddToExistingTeamModal}>Add these students into Team</Button>
                                </>
                                : <>
                                    No member found
                                </>}
                        </Panel>
                    </Collapse>
                </div>
                {/* Add Students into Team Modal */}
                <Modal
                    title={membersNotInTeam.length > 0 ? "Enrolled students that are not in groups" : "No other student has enrolled in this program"}
                    visible={addToExistingTeamVisible}
                    onCancel={() => setAddToExistingTeamVisible(false)}
                    footer={null} // Hide default footer buttons
                >
                    {membersNotInTeam.length > 0 &&
                        <>
                            <Table dataSource={membersNotInTeam} rowKey="Id" pagination={false}>
                                <Column title="Full Name" dataIndex="FullName" key="FullName" />
                                <Column title="Class Code" dataIndex="ClassCode" key="ClassCode" />
                            </Table>
                            <Form layout="vertical">
                                <Form.Item label="Select a Team" required>
                                    <Select
                                        style={{ width: 200 }}
                                        placeholder="Select a Team"
                                        onChange={handleTeamChange}
                                    >
                                        {teams.map(team => (
                                            <Option value={team.Id}>{team.TeamName}</Option>
                                        )
                                        )}
                                    </Select>
                                </Form.Item>
                                <Button block type="primary"
                                    onClick={addStudentsIntoTeam}>Add these students into this team</Button>
                            </Form>
                        </>
                    }
                </Modal>
                <Card title="Teams">
                    {teams.map(team => (
                        <Link to={`./teams/${team.Id}?TeamName=${team.TeamName}`}>
                            <Button>{team.TeamName}</Button>
                        </Link>
                    )
                    )}
                </Card>
                <Button block onClick={openCreateTeamModal}>
                    Create a new team
                </Button>

                <Modal
                    title="Create New Team"
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