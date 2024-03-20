import { Button, Table, Typography } from "antd";
import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MySpin from "../../UI/spin";
import { SolutionsOfTeams } from "../../models/TeamSolutions";
const { Text } = Typography;

const allSolutionsUrl = "https://stem-backend.vercel.app/api/v1/team-solution";
const Submissions: React.FC = () => {
    const [solutions, setSolutions] = useState<SolutionsOfTeams[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    async function getAllSolutions() {
        axios.get(allSolutionsUrl)
            .then((response) => {
                setSolutions(response.data);
                setIsLoading(false);
            })
            .catch(err => {
                console.error(err)
                alert(err.response.data.error);
            });
    }

    const columns = [
        {
            title: 'Index',
            dataIndex: 'index',
            render: (index: number) => index + 1,
        },
        {
            title: 'Team Name',
            dataIndex: 'TeamName',
            key: 'TeamName',
        },
        {
            title: 'Topic',
            dataIndex: 'Topic',
            key: 'Topic',
        },
        {
            title: 'Created Date',
            dataIndex: 'CreateDate',
            key: 'CreateDate',
            render: (solution: SolutionsOfTeams) => (
                <Text>{moment(solution.CreateDate).format("DD/MM/YYYY")}</Text>
            ),
        },
        {
            title: 'Updated Date',
            dataIndex: 'UpdateDate',
            key: 'UpdateDate',
            render: (solution: SolutionsOfTeams) => (
                <Text>{moment(solution.UpdateDate).format("DD/MM/YYYY")}</Text>
            ),
        },
        {
            title: 'Score',
            dataIndex: 'Score',
            key: 'Score',
            render: (score: any) => (
                score ?
                    <h4 style={{ color: 'green' }}>{score}</h4>
                    : <h4 style={{ color: 'red' }}>Not yet</h4>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (solution: SolutionsOfTeams) => (
                <Link to={`./${solution.Id}/details`}>
                    <Button>Details</Button>
                </Link>
            ),
        },
    ];
    useEffect(() => {
        getAllSolutions()
    }, []);

    const dataWithIndex = solutions.map((item, index) => ({ ...item, index }));
    if (isLoading) {
        return <MySpin />
    } else
        return (
            <div>
                <h1>Team' submissions</h1>
                <Table dataSource={dataWithIndex} columns={columns} rowKey="Id" pagination={false} />
            </div>
        )
}
export default Submissions