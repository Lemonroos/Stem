import { Button, Card, Col, Collapse, Form, Image, Input, Modal, Row, Select, Space, Table, Typography } from "antd";
import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import MySpin from "../../UI/spin";
import { GroupCodeAndName } from "../../models/Groups";
import { MembersNotInGroup } from "../../models/Members";
import { Programs } from "../../models/Programs";
import { Provinces } from "../../models/Provinces";
import { Schools } from "../../models/Schools";
import { Teachers } from "../../models/Teachers";
const { Text } = Typography;
const { Option } = Select;

const progUrl = "https://stem-backend.vercel.app/api/v1/programs";
const provinceUrl = "https://stem-backend.vercel.app/api/v1/provinces";
const schoolsInProvinceUrl = "https://stem-backend.vercel.app/api/v1/schools/school-list/schools-in-province";
const membersNotInGroupUrl = "https://stem-backend.vercel.app/api/v1/members/members-not-in-group"
const groupsInSchoolBasedOnProgramIdUrl = "https://stem-backend.vercel.app/api/v1/groups/group-list/available-groups-in-school";
const teachersInSchoolUrl = "https://stem-backend.vercel.app/api/v1/teachers/teacher-list/teachers-in-school";
const groupUrl = "https://stem-backend.vercel.app/api/v1/groups";

const ProgramDetailsOfManager: React.FC = () => {
    const navigate = useNavigate();
    const progId = String(useParams().id);
    const [programDetails, setProgramDetails] = useState<Programs>();
    const [isLoading, setIsLoading] = useState(true);
    const [provinces, setProvinces] = useState<Provinces[]>([]);
    const [schools, setSchools] = useState<Schools[]>([]);
    const [membersNotInGroup, setMembersNotInGroups] = useState<MembersNotInGroup[]>([]);
    const [existedGroups, setExistedGroups] = useState<GroupCodeAndName[]>([])
    const [teachersInSchool, setTeachersInSchool] = useState<Teachers[]>([])

    const [selectedProvinceId, setSelectedProvinceId] = useState<number | null>(null);
    const [selectedSchoolId, setSelectedSchoolId] = useState<number | null>(null);
    const [selectedTeacherId, setSelectedTeacherId] = useState<number | null>(null);

    // For the 3 modals
    const [createGroupVisible, setCreateGroupVisible] = useState(false);

    //For creating new group:
    const [groupName, setGroupName] = useState<string | undefined>();
    async function getProgramById(programId: string) {
        try {
            await axios.get(`${progUrl}/${programId}`)
                .then((response) => {
                    setProgramDetails(response.data);
                    setIsLoading(false);
                })
        } catch (error) {
            console.error(error);
        }
    }
    async function getProvinces() {
        try {
            await axios.get(provinceUrl)
                .then((response) => {
                    setProvinces(response.data);
                    setIsLoading(false);
                })
        } catch (error) {
            console.error(error);
        }
    }
    async function getSchoolsInProvince(provinceId: number) {
        try {
            await axios.get(`${schoolsInProvinceUrl}?ProvinceId=${provinceId}`)
                .then((response) => {
                    setSchools(response.data);
                    setIsLoading(false);
                })
        } catch (error) {
            console.error(error);
        }
    }
    async function getMembersNotInGroup() {
        try {
            await axios.get(`${membersNotInGroupUrl}?SchoolId=${selectedSchoolId}&ProgramId=${progId}`)
                .then((response) => {
                    setMembersNotInGroups(response.data);
                    setIsLoading(false);
                })
        } catch (error) {
            setMembersNotInGroups([])
        }
    }
    async function getAvailableGroupsInSchoolBasedOnProgram() {
        try {
            await axios.get(`${groupsInSchoolBasedOnProgramIdUrl}?SchoolId=${selectedSchoolId}&ProgramId=${progId}`)
                .then((response) => {
                    setExistedGroups(response.data);
                    setIsLoading(false);
                })
        } catch (error) {
            setMembersNotInGroups([])
        }
    }
    async function getTeachersInSchool() {
        try {
            await axios.get(`${teachersInSchoolUrl}?SchoolId=${selectedSchoolId}`)
                .then((response) => {
                    setTeachersInSchool(response.data);
                    setIsLoading(false);
                })
        } catch (error) {
            setMembersNotInGroups([])
        }
    }
    const handleProvinceChange = (value: number) => {
        setSelectedProvinceId(value);
        setSelectedSchoolId(null);
        getSchoolsInProvince(value);
    };
    const handleSchoolChange = (value: number) => {
        setSelectedSchoolId(value);
    };
    const handleTeacherChange = (value: number) => {
        setSelectedTeacherId(value);
    };
    async function addStudentsIntoGroups() {
        openCreateGroupModal();
        membersNotInGroup.forEach(student => {
            console.log('Student #' + student.Id + ' is added to groups')
        });
    }
    async function createNewGroup() {
        try {
            const data = {
                Name: groupName,
                TeacherId: selectedTeacherId
            }
            await axios.post(`${groupUrl}?ProgramId=${progId}`, data)
                .then((response) => {
                    console.log(response);
                    alert('Group created successfully');
                    navigate(`./groups/${response.data.Id}?SchoolId=${selectedSchoolId}`);
                })
        } catch (error) {
            console.error(error)
        }
    }

    const openCreateGroupModal = () => {
        setCreateGroupVisible(true);
    };

    useEffect(() => {
        getProgramById(progId);
        getProvinces();
    }, []);
    useEffect(() => {
        getMembersNotInGroup();
        getAvailableGroupsInSchoolBasedOnProgram();
        getTeachersInSchool();
    }, [selectedSchoolId])

    if (isLoading) {
        return <MySpin />
    } else
        return (
            <div style={{ padding: '24px' }}>
                {programDetails && (
                    <Card>
                        <Row gutter={[16, 16]} style={{ marginBottom: "5%" }}>
                            {/* Column for the image */}
                            <Col span={12}>
                                <Image
                                    src={programDetails.Image}
                                    alt="Program Cover"
                                    width="100%"
                                    height="auto"
                                />
                            </Col>

                            {/* Column for program details */}
                            <Col span={12}>
                                <Row gutter={[16, 16]}>
                                    <Space direction="vertical" size="middle">
                                        <Typography.Title level={3}>{programDetails.Name}</Typography.Title>
                                    </Space>
                                </Row>
                                <Row gutter={[16, 16]}>

                                    <Col span={12}>

                                        <Space direction="vertical" size="middle">
                                            <Row gutter={[16, 16]}>
                                                <Text strong>Code:</Text>
                                            </Row>
                                            <Row gutter={[16, 16]}>
                                                <Text>{programDetails.Code}</Text>  </Row>


                                            <Row gutter={[16, 16]}>
                                                <Text strong>Start Date:</Text>  </Row>
                                            <Row gutter={[16, 16]}>
                                                <Text>{moment(programDetails.StartDate).format("DD/MM/YYYY")}</Text>  </Row>
                                            <Row gutter={[16, 16]}>
                                                <Text strong>Description:</Text>  </Row>
                                            <Row gutter={[16, 16]}>
                                                <Text>{programDetails.Description}</Text>  </Row>

                                        </Space>
                                    </Col>
                                    <Col span={12}>
                                        <Space direction="vertical" size="middle">
                                            <Row gutter={[16, 16]}>
                                                <Text strong>End Date:</Text></Row>
                                            <Row gutter={[16, 16]}>
                                                <Text>{moment(programDetails.EndDate).format("DD/MM/YYYY")}</Text></Row>
                                            <Row gutter={[16, 16]}>
                                                <Text strong>Created Date:</Text></Row>
                                            <Row gutter={[16, 16]}>
                                                <Text>{moment(programDetails.CreatedDate).format("DD/MM/YYYY")}</Text></Row>
                                        </Space>
                                    </Col>

                                </Row>
                            </Col>
                        </Row>
                    </Card>
                )}
                <Card style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Select
                        value={selectedProvinceId}
                        style={{ width: 200 }}
                        placeholder="Select Province"
                        onChange={handleProvinceChange}
                    >
                        {provinces.map(province => (
                            <Option value={province.Id}>{province.Name}</Option>
                        )
                        )}
                    </Select>
                    {selectedProvinceId && (
                        <Select
                            value={selectedSchoolId}
                            style={{ width: '100%', marginTop: 16 }}
                            placeholder="Select School"
                            onChange={handleSchoolChange}
                        >
                            {schools.map(school => (
                                <Option value={school.Id}>{school.SchoolName}</Option>
                            )
                            )}
                        </Select>
                    )}
                </Card>
                {(existedGroups.length > 0) ?
                    <Card>
                        <h1>Existed Groups (of the selected school) for this program</h1>
                        {existedGroups.map(group => (
                            <Link to={`./groups/${group.Id}?SchoolId=${selectedSchoolId}`}>
                                <Button block>{group.Name}
                                </Button>
                            </Link>
                        )
                        )}
                    </Card>
                    : (selectedSchoolId && <Button block onClick={addStudentsIntoGroups}>
                        Create a new group
                    </Button>)
                }
                {/* Create new group modal */}
                <Modal
                    title="Create New Group"
                    visible={createGroupVisible}
                    onCancel={() => setCreateGroupVisible(false)}
                    footer={null} // Hide default footer buttons
                >

                    {/* Add your content for the modal here */}
                    <Form layout="vertical">
                        <Form.Item label="Name of the new group" required>
                            <Input required
                                value={groupName}
                                placeholder="Group Name"
                                onChange={(e) => setGroupName(e.target.value)}
                            />
                        </Form.Item>
                        <Form.Item label="Select a teacher" required>
                            <Select
                                style={{ width: 200 }}
                                placeholder="Select Teacher"
                                onChange={handleTeacherChange}
                            >
                                {teachersInSchool.map(teacher => (
                                    <Option value={teacher.Id}>{teacher.TeacherName}</Option>
                                )
                                )}
                            </Select>
                        </Form.Item>
                        <Button block type="primary" onClick={createNewGroup}>Create group</Button>
                    </Form>
                </Modal>
            </div>
        );
}
export default ProgramDetailsOfManager