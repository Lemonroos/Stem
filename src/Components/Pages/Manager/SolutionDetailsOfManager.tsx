import { Button, Card, Col, Form, Input, Modal, Row, Space } from "antd";
import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import MySpin from "../../UI/spin";
import { Labs } from "../../models/Labs";
import { SolutionsOfTeams } from "../../models/TeamSolutions";

const teamSolutionUrl = "https://stem-backend.vercel.app/api/v1/team-solution";
const labByIdUrl = 'https://stem-backend.vercel.app/api/v1/labs';

const SolutionDetailsOfManager: React.FC = () => {
    const solutionId = useParams().solutionId;
    const [solutionDetails, setSolutionDetails] = useState<SolutionsOfTeams>()
    const [labId, setLabId] = useState<number>();
    const [labDetails, setLabDetails] = useState<Labs>();
    const [score, setScore] = useState<number>();
    const [isLoading, setIsLoading] = useState(true);

    const [editScoreVisible, setEditScoreVisible] = useState(false);
    async function getSolutionDetails() {
        console.log(solutionId)
        await axios.get(`${teamSolutionUrl}/${solutionId}`)
            .then((res) => {
                setSolutionDetails(res.data);
                setLabId(res.data.Id);
                setIsLoading(false)
            })
    }

    async function getLabById(labId: any) {
        await axios.get(`${labByIdUrl}/${labId}`)
            .then(res => {
                setLabDetails(res.data)
            })
            .catch((err) => {
                console.error(err.response.data.error);
            })
    }
    useEffect(() => {
        getSolutionDetails();
    }, [])
    useEffect(() => {
        getLabById(labId);
    }, [labId])

    const openEditScoreModal = () => {
        setEditScoreVisible(true);
        setScore(solutionDetails?.Score);
    }

    async function confirmEditScore() {
        try {
            if (score && score > 0 && score <= 10) {
                await axios.put(`${teamSolutionUrl}/${solutionId}`, {
                    Score: score
                })
                    .then(res => {
                        alert(res.data.message);
                        window.location.reload();
                    })
                    .catch((err) => {
                        alert(err.response.data.error);
                    })
            } else alert('Score must be from 0 -> 10');
            setScore(solutionDetails?.Score)
        } catch (error) {
            console.error(error)
        }
    }
    if (isLoading) {
        return <MySpin />
    } else
        return (
            <div>
                <h1>Solution of Team {solutionDetails?.TeamName}</h1>
                <Card style={{ width: '100%', borderRadius: '20px', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)' }}>
                    <h1>Program: {labDetails?.ProgramName}</h1>
                    <h1>{labDetails?.Code}: {labDetails?.Topic}</h1>
                    <Row>
                        <Col span={12} style={{ textAlign: 'center' }}>
                            <img src={labDetails?.Image} alt="LabImage" style={{ width: '80%', borderRadius: '10px' }} />
                        </Col>
                        <Col span={12}>
                            <Card.Meta title="Description" description={labDetails?.Description} />
                        </Col>
                    </Row>
                </Card>
                <Space>
                    <h1>Team solution:</h1> <Link to={`${solutionDetails?.Solution}`}>View Team's solution</Link>
                    <h3>| Created On:</h3> {moment(solutionDetails?.UpdateDate).format("DD/MM/YYYY")}
                </Space>
                <hr />
                <Space>
                    <h1>Score:</h1>
                    {solutionDetails?.Score ?
                        <h2 style={{ color: 'green' }}>{solutionDetails?.Score}</h2>
                        : <h2 style={{ color: 'red' }}>Not yet</h2>}
                    <Button onClick={openEditScoreModal}>Edit score</Button>
                </Space>
                <Modal
                    title="Editing Score"
                    visible={editScoreVisible}
                    onCancel={() => setEditScoreVisible(false)}
                    footer={null} // Hide default footer buttons
                >

                    {/* Add your content for the modal here */}
                    <Form layout="vertical">
                        <Form.Item label="Score" required>
                            <Input type="number" required
                                value={score}
                                placeholder="Group Name"
                                onChange={(e) => setScore(Number(e.target.value))}
                                min={0} max={10}
                            />
                        </Form.Item>
                        <Button block type="primary" onClick={confirmEditScore}>Confirm edit score</Button>
                    </Form>
                </Modal>
            </div>
        )
}

export default SolutionDetailsOfManager;