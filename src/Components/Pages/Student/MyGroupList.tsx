import { useEffect, useState } from 'react';
import { Button, Table } from 'antd';
import type { GetProp, TableProps } from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom';



type ColumnsType<T> = TableProps<T>['columns'];
type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>;


interface TableParams {
    pagination?: TablePaginationConfig;
    sortField?: string;
    sortOrder?: string;
    filters?: Parameters<GetProp<TableProps, 'onChange'>>[1];
}

interface ProgramAndGroup {
    Id: Number,
    StudentId: Number,
    ClassCode: String,
    FullName: String,
    ProgramId: Number,
    ProgramCode: String,
    ProgramName: String,
    CreatedDate: Date,
    UpdatedDate: Date,
    Description: String,
    Image: String,
    GroupId: Number,
    GroupCode: String,
    GroupName: String
}

const columns: ColumnsType<ProgramAndGroup> = [
    {
        title: 'Program code',
        dataIndex: 'ProgramCode',
        sorter: true,
        render: (ProgramCode) => `${ProgramCode}`,
    },
    {
        title: 'Program Name',
        dataIndex: 'ProgramName',
        sorter: true,
        render: (ProgramName) => `${ProgramName}`,
    },
    {
        title: 'Group Code',
        dataIndex: 'GroupCode',
        sorter: true,
        render: (GroupCode) => `${GroupCode}`,
    },
    {
        title: 'View',
        dataIndex: 'GroupId',
        sorter: true,
        render: (GroupId) =>
            <Button>
                <Link to={`./details/${GroupId}`}>
                    More
                </Link>
            </Button>,
    },
];

const MyGroups: React.FC = () => {
    const studentId = 1;
    const progamsByStudentUrl = 'https://stem-backend.vercel.app/api/v1/members/programs-of-a-student';
    const [data, setData] = useState<ProgramAndGroup[]>();
    const [loading, setLoading] = useState(false);
    const [tableParams, setTableParams] = useState<TableParams>({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });
    async function getProgramByStudentId(studentId: number) {
        try {
            setLoading(true);
            await axios.get(`${progamsByStudentUrl}?StudentId=${studentId}`)
                .then((res) => {
                    setData(res.data);
                    setLoading(false);
                    setTableParams({
                        ...tableParams,
                        pagination: {
                            ...tableParams.pagination,
                            total: 40,
                        },
                    });
                })
        } catch (error) {
            console.error("Error fetching programs:", error);
        }
    }

    useEffect(() => {
        getProgramByStudentId(studentId);
    }, [JSON.stringify(tableParams)]);

    const handleTableChange: TableProps['onChange'] = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            filters,
            ...sorter,
        });

        // `dataSource` is useless since `pageSize` changed
        if (pagination.pageSize !== tableParams.pagination?.pageSize) {
            setData([]);
        }
    };

    return (
        <>
            <h1>My groups</h1>
            <Table
                columns={columns}
                dataSource={data}
                pagination={tableParams.pagination}
                loading={loading}
                onChange={handleTableChange}
            />
        </>
    );
};

export default MyGroups;