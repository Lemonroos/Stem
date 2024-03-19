import { Card, Col, Row, Tabs } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Labs } from "../../models/Labs";
import TabPane from "antd/es/tabs/TabPane";
import { Upload, Button, message, UploadFile, Collapse} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../../config/firebase";
import getUser from "../../../config/auth";
import { TeamMember } from "../../models/Members";
const { Panel } = Collapse;
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

    // const [isLoading, setIsLoading] = useState(true);
    async function getLabsInProgramm() {
        await axios.get(`${labByIdUrl}/${labId}`)
            .then(data => {
                setLab(data.data)
            })
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
            // setIsLoading(false);
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

        }
    }, [teamId]);


    // const groupData = [
    //     {
    //         title: '4 (6 students) - Your team',
    //     },
    // ];
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
            console.log(data)
            message.success('Upload complete!');
            // setUploading(false);
        }
        // console.log(data)
        setTimeout(() => {
            message.success('Upload successful!');
        }, 1000);
    };
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
                <TabPane tab="SUBMISSION" key="2">
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
                        disabled={!file || progress < 100}
                        style={{ marginTop: 16 }}
                    >
                        {!file ? 'Start Upload' : progress < 100 ? 'Uploading...' : 'Submit File'}
                    </Button>

                </TabPane>
                <TabPane tab="GRADE" key="3">
                    {/* GRADE content */}
                </TabPane>
                <TabPane tab="TEACHER'S MESSAGE" key="4">
                    {/* Teacher's message content */}
                </TabPane>
            </Tabs>
        </div>
    )
}
export default LabDetails