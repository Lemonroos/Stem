import { Card, Col, Input, Pagination, Row, Select } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { Programs } from "../../models/Programs";

import { Link } from "react-router-dom";
import MySpin from "../../UI/spin";
const { Meta } = Card;
const { Option } = Select;

const CustomPagination = ({ totalItems, currentPage, itemsPerPage, onChange }: any) => {
    const handlePageChange = (page: number) => {
        onChange(page, itemsPerPage);
    };

    const handleItemsPerPageChange = (value: number) => {
        onChange(currentPage, value);
    };

    return (
        <Row style={{ marginTop: '1%',display: "flex", justifyContent: 'center', alignItems: 'center' }}>
            <Pagination
                current={currentPage}
                total={totalItems}
                pageSize={itemsPerPage}
                onChange={handlePageChange}
                showSizeChanger={false}
            />
            <span style={{ marginLeft: 16 }}>Items per page:</span>
            <Select
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
                style={{ width: 80, marginLeft: 8 }}
            >
                <Option value={4}>4</Option>
                <Option value={6}>6</Option>
                <Option value={10}>10</Option>
                <Option value={20}>20</Option>
            </Select>
        </Row>
    );
};

const ProgramList: React.FC = () => {
    const programsUrl = "https://stem-backend.vercel.app/api/v1/programs";
    const [programs, setPrograms] = useState<Programs[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [total, setTotal] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [order, setOrder] = useState('asc'); // Default order is ascending
    const [sortField, setSortField] = useState('Name'); // Default order is ascending

    //Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6); // Default items per page

    const handlePaginationChange = (page: number, pageSize: number) => {
        setCurrentPage(page);
        setItemsPerPage(pageSize);
    };
    const handleOrderChange = (newOrder: any) => {
        setCurrentPage(1); // Set currentPage back to the initial page value
        setOrder(newOrder);
    };

    const handleSortFieldChange = (newSortField: any) => {
        setCurrentPage(1); // Set currentPage back to the initial page value
        setSortField(newSortField);
    };
    async function countPrograms() {
        try {
            await axios.get(`${programsUrl}`)
                .then((res) => {
                    setTotal(res.data.length)
                })
        } catch (error) {
            console.error("Error fetching programs:", error);
        }
    }
    async function getAllPrograms() {
        try {
            await axios.get(`${programsUrl}?search=${searchTerm}&page=${currentPage}&limit=${itemsPerPage}&sortField=${sortField}&sortOrder=${order}`)
                .then((res) => {
                    setPrograms(res.data);
                    setIsLoading(false);
                })
        } catch (error) {
            console.error("Error fetching programs:", error);
        }
    }

    useEffect(() => {
        countPrograms();
    }, [])
    useEffect(() => {
        getAllPrograms();
        console.log(searchTerm);
        console.log(order);
        console.log(sortField);
        console.log(currentPage);
        console.log(itemsPerPage);
    }, [searchTerm, currentPage, itemsPerPage, sortField, order]);
    if (isLoading) {
        return <MySpin />
    } else
        return (
            <div>
                <Row style={{ marginBottom:'1%',display: "flex", justifyContent: 'center', alignItems: 'center' }}>
                    {/* Search bar */}
                    <Input
                        placeholder="Enter name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ width: 200, marginRight: 16 }}
                    />
                    <Select
                        value={order}
                        onChange={handleOrderChange}
                        style={{ width: 120, marginRight: 16 }}
                    >
                        <Option value="asc">Ascending</Option>
                        <Option value="desc">Descending</Option>
                    </Select>
                    <Select
                        value={sortField}
                        onChange={handleSortFieldChange}
                        style={{ width: 120, marginRight: 16 }}
                    >
                        <Option value="Id">Id</Option>
                        <Option value="Name">Name</Option>
                    </Select>
                </Row>

                <Row gutter={16}>
                    {programs.map(program => (
                        <Col span={8} key={program.Id}>
                            <Link to={`./details/${program.Id}`}>
                                <Card
                                    hoverable
                                    style={{ width: '100%', height: '100%' }}
                                    cover={<img alt="news" src={program.Image} style={{ height: '30vh', objectFit: 'cover' }} />}
                                >
                                    <Meta
                                        title={program.Name}
                                        description={program.Description}
                                    />
                                </Card>
                            </Link>
                        </Col>
                    ))}
                </Row>
                <CustomPagination
                    totalItems={total} // Total number of items
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    onChange={handlePaginationChange}
                />
            </div>
        )
}
export default ProgramList
