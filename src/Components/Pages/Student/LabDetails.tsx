import { Card, Col, Divider, Row, Tabs } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Labs } from "../../models/Labs";
import TabPane from "antd/es/tabs/TabPane";
import { Upload, Button,  message, UploadFile, Collapse, Typography, Space } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../../config/firebase";
import getUser from "../../../config/auth";
import { TeamMember, TeamSolution } from "../../models/Members";
import MySpin from "../../UI/spin";
const { Panel } = Collapse;

const { Title } = Typography;
const LabDetails: React.FC = () => {
    const { programId, labId } = useParams();
    const labByIdUrl = 'https://stem-backend.vercel.app/api/v1/labs';
    const [lab, setLab] = useState<Labs>()
    const [file, setFile] = useState<any>("");
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [data, setData] = useState({});
    const [progress, setProgress] = useState(0);
    const [userId, setUserId] = useState<any>(null);
    const [teamId, setTeamId] = useState(null);
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
    const [solutionData, setSolutionData] = useState<TeamSolution>();
    const [isLoading, setIsLoading] = useState(true);
    const [isGraded, setIsGraded] = useState(false);
    async function getLabsInProgramm() {
        await axios.get(`${labByIdUrl}/${labId}`)
            .then(data => {
                setLab(data.data)
            })
        console.log("Lab: " + labId)
    }
    useEffect(() => {
        getLabsInProgramm()
    }, []);

    const fetchTeamId = async () => {
        const response = await axios.get(`https://stem-backend.vercel.app/api/v1/members/team-of-a-member?StudentId=${userId}&ProgramId=${programId}`);
        // Assuming the response data is an object with a teamId property
        setTeamId(response.data.TeamId);
        // console.log("here", response.data.teamId);
    };


    useEffect(() => {
        const fetchUser = async () => {
            const resObject = await getUser();
            setUserId(resObject.userId);
            setIsLoading(false);
        };
        fetchUser();
    }, []);

    useEffect(() => {
        if (userId && programId) {
            fetchTeamId();
        }
    }, [userId, programId]);

    const fetchTeamMembers = async () => {
        const response = await axios.get(`https://stem-backend.vercel.app/api/v1/member-in-team?TeamId=${teamId}`);
        setTeamMembers(response.data);
        // console.log(response.data)
    };
    useEffect(() => {
        console.log('teamId:', teamId);
        if (teamId) {
            fetchTeamMembers();
            setIsLoading(false)
        }
    }, [teamId]);

    const fetchSolutionData = async () => {
        try {
            const response = await axios.get(`https://stem-backend.vercel.app/api/v1/team-solution/team-solution-list/solutions-of-team?TeamId=${teamId}&LabId=${labId}`);
            if (response.status === 200) {
                setSolutionData(response.data);
                console.log("daaddsa" + solutionData);
            } else {
                throw new Error('HTTP status ' + response.status);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    useEffect(() => {
        if (teamId && labId) {
            fetchSolutionData();
            setIsLoading(false);
        }
    }, [teamId, labId]);




    const handleRemove = (file: UploadFile) => {
        // Update the state to remove the file from the list
        setFileList(prevList => prevList.filter(item => item.uid !== file.uid));
        // Return false to prevent any default behavior or network request
        return false;
    };

    const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB in bytes

    const handleFileChange = (info: { file: UploadFile, fileList: UploadFile[] }) => {
        const file = info.file;
        if (file.size && file.size > MAX_FILE_SIZE) {
            message.error('File size exceeds 50MB limit.');
            file.status = 'error';
            setFileList([file]);
        } else {
            setFileList([file]);
            setFile(file);
        }
    };



    useEffect(() => {
        const uploadFile = () => {
            const storageRef = ref(storage, file.name);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    setProgress(progress);
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                    }
                },
                (error) => {
                    console.log(error)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        // console.log('File available at', downloadURL);
                        // setData((prev: any) => ({ ...prev, file: downloadURL }));
                        setData(downloadURL);
                    });
                }
            );
        };
        file && uploadFile();
    }, [file]);


    const handleUpload = async () => {
        if (progress < 100) {
            // Your upload logic here
        } else {
            console.log(data);
            try {
                const response = await axios.post(`https://stem-backend.vercel.app/api/v1/team-solution?LabId=${labId}&TeamId=${teamId}`, {
                    Solution: data,
                });

                if (response.status !== 200) {
                    throw new Error('HTTP status ' + response.status);
                }

                message.success('Upload complete!');
                // setUploading(false);
            } catch (error: any) {
                // console.error('Error:', error);
                message.error(error.response.data.error)
                // if (error instanceof AxiosError && error.response && error.response.status === 400) {
                //     message.error('The file cannot be submitted as it has already been graded.');
                setIsGraded(true);
                // }
            }
        }

    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 8000); // Set the timeout duration as per your requirement

        return () => clearTimeout(timer); // This will clear the timeout if the component unmounts before the timeout finishes
    }, []);


    if (isLoading) {
        return <div><MySpin /></div>
    }

    return (
        <div>
            <h1>{lab?.Code}: {lab?.Topic}</h1>
            <Card style={{ width: '100%', borderRadius: '20px', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)' }}>
                <Row>
                    <Col span={12} style={{ textAlign: 'center' }}>
                        <img src={lab?.Image} alt="LabImage" style={{ width: '80%', borderRadius: '10px' }} />
                    </Col>
                    <Col span={12}>
                        <Card.Meta title="Description" description={lab?.Description} />
                    </Col>
                </Row>
            </Card>
            <Divider />
            {teamId ? (
                <Tabs defaultActiveKey="1">
                    <TabPane tab="TEAM" key="1">
                        <Collapse accordion>
                            {teamMembers.map((member, index) => (
                                <Panel header={member.FullName} key={index}>
                                    <p>Student Code: {member.StudentCode}</p>
                                    <p>Class Code: {member.ClassCode}</p>
                                </Panel>
                            ))}
                        </Collapse>
                    </TabPane>
                    <TabPane tab="SUBMISSION" key="2" style={{ width: '100%' }}>
                        <Space direction="vertical" style={{ padding: '1em', backgroundColor: '#f0f2f5', borderRadius: '5px', width: '100%' }}>
                            <Upload
                                name="labImage"
                                listType="picture"
                                maxCount={1}
                                beforeUpload={() => false}
                                onChange={handleFileChange}
                                fileList={fileList}
                                onRemove={handleRemove}
                            >
                                <Button icon={<UploadOutlined />}>Click to Upload</Button>
                            </Upload>
                            <Button
                                type="primary"
                                onClick={handleUpload}
                                disabled={!file || progress < 100 || isGraded}
                                style={{ marginTop: '1em' }}
                            >
                                {!file ? 'Start Upload' : progress < 100 ? 'Uploading...' : 'Submit File'}
                            </Button>
                        </Space>
                    </TabPane>

                    <TabPane tab="GRADE" key="3" style={{ width: '100%' }}>
                        <Space direction="vertical" style={{ padding: '1em', backgroundColor: '#f0f2f5', borderRadius: '5px', width: '100%' }}>
                            <Title level={4} style={{ color: '#1890ff' }}>Solution:</Title>
                            {solutionData?.Solution ? (
                                (
                                    <Button type="primary" href={solutionData.Solution} target="_blank">
                                        Download Solution
                                    </Button>
                                )
                            ) : (
                                'N/A'
                            )}
                            <Title level={4} style={{ color: '#1890ff', marginTop: '1em' }}>Score:</Title>
                            <p style={{ fontSize: '1.2em', fontWeight: 'bold' }}>{solutionData?.Score || 'N/A'}</p>
                        </Space>
                    </TabPane>
                </Tabs>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                    <Title level={2}>You're not in a team yet!</Title>
                    <p>Please join a team to be able to do the lab. If you need assistance, contact your teacher.</p>
                </div>
            )}
        </div>
    );
}
export default LabDetails