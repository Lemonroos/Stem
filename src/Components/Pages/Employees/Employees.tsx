import React, { useState } from "react";
import {
  Table,
  Button,
  Typography,
  Space,
  Badge,
  Avatar,
  Tag,
  Select,
  Input,
} from "antd";
import {
  EllipsisOutlined,
  PlusOutlined,
  UserOutlined,
  IdcardOutlined,
  PhoneOutlined,
  ManOutlined,
  WomanOutlined,
  MailOutlined,
  BankOutlined,
  CalendarOutlined,
  HomeOutlined,
  GlobalOutlined,
  UnorderedListOutlined,
  NumberOutlined,
} from "@ant-design/icons";
import PageLayout from "../../ProjectLayOut/PageLayout";
import TableInput from "../../TableInput/TableInputLayout";
import employeesData from "../../data/employeesData";
import {
  getColor,
  renderSecondaryText,
  renderSecondaryTextUnderline,
} from "../../Utils/Utilities";
const { Option } = Select;
// const { Search } = Input;

const { Title, Text } = Typography;
// const  renderSecondaryText = (text) => (
// <Typography.Text strong>{text}</Typography.Text>
// );

const columns = [
  {
    title: "",
    dataIndex: "",
    key: "",
    render: () => <Button type="text" icon={<EllipsisOutlined />} />,
  },
  {
    title: "",
    dataIndex: "avatar",
    key: "avatar",
    render: (text, record) => (
      <Avatar
        style={{
          backgroundColor:
            record.role === "CL"
              ? "#FF0000" // Red color for CL
              : record.role === "GL"
              ? "#FFA500" // Orange color for GL
              : record.role === "kicked"
              ? "#f5f5f5" // Grey color for kicked
              : "#808080", // Default background color for employees
        }}
        size="small"
        icon={<UserOutlined />}
      />
    ),
  },
  {
    title: "ID",

    dataIndex: "id",
    key: "id",
    render: renderSecondaryText,
  },
  {
    title: (
      <Space>
        <UnorderedListOutlined />
        Tên Học Viên
      </Space>
    ),
    dataIndex: "name",
    key: "name",
    render: (text, record) => (
      <>
        <Avatar src={record.avatar} style={{ marginRight: "10px" }} />
        {renderSecondaryText(text)}
      </>
    ),
  },

  // {
  //   title: (
  //     <Space>
  //       <UnorderedListOutlined />
  //       Phòng Ban
  //     </Space>
  //   ),
  //   dataIndex: "department",
  //   key: "department",
  //   render: (text) => (
  //     <Space>
  //       <Badge color={getColor(text)} />
  //       {renderSecondaryTextUnderline(text)}
  //     </Space>
  //   ),
  // },

  {
    title: (
      <Space>
        <PhoneOutlined />
        Số điện thoại
      </Space>
    ),
    dataIndex: "phone",
    key: "phone",
    render: renderSecondaryText,
  },

  {
    title: (
      <Space>
        <UnorderedListOutlined />
        Giới tính
      </Space>
    ),
    dataIndex: "gender",
    key: "gender",
    render: (text) => (
      <Tag
        style={{
          fontWeight: "bold",
          color: text === "Nam" ? "#489bb2" : "#de747c",
          backgroundColor: text === "Nam" ? "#d1f2fb" : "#f4d7d6",
        }}
        bordered={false}
      >
        {text}
      </Tag>

      // ,
      // <Tag bordered={false} color="processing">
      //  {text}
      // </Tag>
    ),
  },

  {
    title: (
      <Space>
        <MailOutlined />
        Email
      </Space>
    ),
    dataIndex: "email",
    key: "email",
    render: renderSecondaryText,
  },
  // {
  //   title: (
  //     <Space>
  //       <BankOutlined />
  //       Ngân hàng
  //     </Space>
  //   ),
  //   dataIndex: "bank",
  //   key: "bank",
  //   render: renderSecondaryText,
  // },
  // {
  //   title: (
  //     <Space>
  //       <CalendarOutlined />
  //       Ngày sinh
  //     </Space>
  //   ),
  //   dataIndex: "birthdate",
  //   key: "birthdate",
  //   render: renderSecondaryText,
  // },
  {
    title: (
      <Space>
        <HomeOutlined />
        Địa chỉ
      </Space>
    ),
    dataIndex: "address",
    key: "address",
    render: renderSecondaryText,
  },
  {
    title: (
      <Space>
        <GlobalOutlined />
        Quốc gia
      </Space>
    ),
    dataIndex: "country",
    key: "country",
    // width: 150,
    render: renderSecondaryText,
  },
  // {
  //   title: (
  //     <Space>
  //       <NumberOutlined />
  //       Tài khoản ngân hàng
  //     </Space>
  //   ),
  //   dataIndex: "account",
  //   key: "account",
  //   render: renderSecondaryText,
  // },
];

const Employees = () => {
  const [searchText, setSearchText] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("");

  // const handleSearch = (event) => {
  //   setSearchText(event.target.value.toLowerCase());
  // };

  // const handleFilterChange = (value) => {
  //   setFilterDepartment(value);
  // };

  const handleRefresh = () => {
    setSearchText("");
    setFilterDepartment("");
  };

  const filteredData = employeesData.filter((employee) => {
    if (searchText && !employee.name.toLocaleLowerCase().includes(searchText)) {
      return false;
    }
    if (filterDepartment && employee.department !== filterDepartment) {
      return false;
    }
    return true;
  });

  return (
    <>
      <PageLayout
        headerContent={
          <>
            <Title level={3} style={{ color: "#000", marginTop: 0 }}>
              Danh Sách Nhân Viên
            </Title>
          </>
        }
        footerContent={<div>Home Page Footer</div>}
      >
        <div
          style={{
            margin: "0 0 10px 0",
            border: "1px solid #ccc",
            boxShadow: "0 -2px 8px rgba(0, 0, 0, 0.15)",
          }}
        >
          <TableInput
            searchText={searchText}
            setSearchText={setSearchText}
            filterDepartment={filterDepartment}
            setFilterDepartment={setFilterDepartment}
            handleRefresh={handleRefresh}
          />
        </div>

        <div
        // style={{
        //   padding: "0 10% 0 10%",
        // }}
        >
          <Table
            size="large"
            dataSource={filteredData}
            columns={columns}
            scroll={{
              x: "max-content",
              // y: 500,
            }}
            style={{
              border: "1px solid #ccc",
              boxShadow: "0 -2px 8px rgba(0, 0, 0, 0.15)",
            }}
            pagination={{
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total}`,
              pageSize: 7,
              // defaultPageSize: 5,
            }}
            className=""
            // rowKey={record => record.id}
          />
        </div>
      </PageLayout>
    </>
  );
};

export default Employees;
