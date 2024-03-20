import { Button, Collapse, Modal, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import MySpin from "../../UI/spin";
import { Groups } from "../../models/Groups";
import { MembersInGroup, MembersNotInGroup } from "../../models/Members";
const { Panel } = Collapse;
const { Column } = Table;

const groupUrl = "https://stem-backend.vercel.app/api/v1/groups";
const membersInGroupUrl = "https://stem-backend.vercel.app/api/v1/members/member-in-group";
const membersNotInGroupUrl = "https://stem-backend.vercel.app/api/v1/members/members-not-in-group"
const memberUrl = "https://stem-backend.vercel.app/api/v1/members";
const GroupDetails: React.FC = () => {
    const programId = useParams().programId
    const groupId = useParams().groupId;
    const search = useLocation().search;
    const params = new URLSearchParams(search);
    const SchoolId = params.get("SchoolId");
    const [isLoading, setIsLoading] = useState(true);
    const [groupInfo, setGroupInfo] = useState<Groups | null>(null);
    const [groupMembers, setGroupMembers] = useState<MembersInGroup[]>([]);
    const [membersNotInGroup, setMembersNotInGroups] = useState<MembersNotInGroup[]>([]);
    const [addToExistingVisible, setAddToExistingVisible] = useState(false);
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
    async function getMembersNotInGroup() {
        try {
            await axios.get(`${membersNotInGroupUrl}?SchoolId=${SchoolId}&ProgramId=${programId}`)
                .then((response) => {
                    setMembersNotInGroups(response.data);
                    setIsLoading(false);
                })
        } catch (error) {
            setMembersNotInGroups([])
        }
    }
    const openAddToExistingModal = () => {
        setAddToExistingVisible(true);
    };
    async function addStudentsIntoGroup() {
        membersNotInGroup.forEach(student => {
            axios.put(`${memberUrl}?Id=${student.Id}`, {
                GroupId: groupId,
            }).then(() => {
                alert('Student #' + student.Id + ' is added into this group');
                window.location.reload();
            })
                .catch(err => console.log(err));
        });
    }
    useEffect(() => {
        getGroupInfo();
        getGroupMembers();
        getMembersNotInGroup()
    }, []);
    if (isLoading) {
        return <MySpin />
    } else
        return (
            <div>
                <h1>Details of group #{groupInfo?.GroupCode}</h1>
                <strong>Group Name:</strong> "{groupInfo?.GroupName}" -
                <strong>Teacher:</strong> {groupInfo?.TeacherName}
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
                        {membersNotInGroup.length > 0 && <Button block type="primary" onClick={openAddToExistingModal}>Add members</Button>}
                    </Panel>
                </Collapse>
                {/* Add to existing groups modal */}
                <Modal
                    title={membersNotInGroup.length > 0 ? "Enrolled students that are not in groups" : "No other student has enrolled in this program"}
                    visible={addToExistingVisible}
                    onCancel={() => setAddToExistingVisible(false)}
                    footer={null} // Hide default footer buttons
                >
                    {membersNotInGroup.length > 0 &&
                        <>
                            <Table dataSource={membersNotInGroup} rowKey="Id" pagination={false}>
                                <Column title="Full Name" dataIndex="FullName" key="FullName" />
                                <Column title="Class Code" dataIndex="ClassCode" key="ClassCode" />
                            </Table>
                            <>
                                <hr />
                                <Button block type="primary"
                                    onClick={addStudentsIntoGroup}>Add these students into this group</Button>
                            </>
                        </>
                    }
                    {/* <Form layout="vertical">
                        <Form.Item label="Select a Group" required>
                            <Select
                                style={{ width: 200 }}
                                placeholder="Select a Group"
                                onChange={handleGroupChange}
                            >
                                {existedGroups.map(group => (
                                    <Option value={group.Id}>{group.GroupCode}</Option>
                                )
                                )}
                            </Select>
                        </Form.Item>
                        <Button block type="primary">Add students into this group</Button>
                    </Form> */}
                </Modal>
            </div>
        )
}
export default GroupDetails;