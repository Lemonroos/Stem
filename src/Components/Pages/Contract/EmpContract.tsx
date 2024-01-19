import {
  CalendarOutlined,
  ContainerOutlined,
  EllipsisOutlined,
  NumberOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Badge,
  Button,
  
  Space,
  Table,
  Tag,
  Typography
} from "antd";
import { useState } from "react";
import PageLayout from "../../ProjectLayOut/PageLayout";
import {
  formatDate2,
  getColor,
  renderNote,
  renderSalary,
  renderSecondaryText,
  renderSecondaryTextUnderline,
} from "../../Utils/Utilities";
import empContractData from "../../data/empContractData";
// const { Option } = Select;

const { Title } = Typography;
const columns = [
  {
    title: "",
    dataIndex: "",
    key: "",
    render: () => <Button type="text" icon={<EllipsisOutlined />} />,
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
        <UserOutlined />
        Tạo bởi
      </Space>
    ),
    dataIndex: "name",
    key: "name",
    render: (text: any, record: any) => (
      <>
        <Avatar src={record.avatar} style={{ marginRight: "10px" }} />
        {renderSecondaryText(text)}
      </>
    ),
  },
  {
    title: (
      <Space>
        <UnorderedListOutlined />
        Loại hợp đồng
      </Space>
    ),
    dataIndex: "contractType",
    key: "contractType",
    render: (text: any) => (
      <Space>
        <Badge color={getColor(text)} />
        {renderSecondaryTextUnderline(text)}
      </Space>
    ),
  },
  {
    title: (
      <Space>
        <UnorderedListOutlined />
        Trạng thái
      </Space>
    ),
    dataIndex: "status",
    key: "status",
    render: (text: any) => (
      <Tag
        style={{
          fontWeight: "bold",
          color: text === "Hiệu lực" ? "#877ec0" : "#de747c",
          backgroundColor: text === "Hiệu lực" ? "#eae6fe" : "#f4d7d6",
        }}
        bordered={false}
      >
        {text}
      </Tag>
    ),
  },
  {
    title: (
      <Space>
        <UnorderedListOutlined />
        Loại lương
      </Space>
    ),
    dataIndex: "salType",
    key: "salType",
    render: (text: any) => (
      <Tag
        style={{
          fontWeight: "bold",
          color: text === "Gross To Net" ? "#489bb2" : "#de747c",
          backgroundColor: text === "Gross To Net" ? "#d1f2fb" : "#f4d7d6",
        }}
        bordered={false}
      >
        {text}
      </Tag>
    ),
  },
  {
    title: (
      <Space>
        <NumberOutlined />
        Người phụ thuộc
      </Space>
    ),
    dataIndex: "dependents",
    key: "dependents",
    render: renderSecondaryText,
  },
  {
    title: (
      <Space>
        <CalendarOutlined />
        Ngày bắt đầu
      </Space>
    ),
    dataIndex: "from",
    key: "from",
    render: (text: any) => renderSecondaryText(formatDate2(text)),
  },
  {
    title: (
      <Space>
        <CalendarOutlined />
        Ngày kết thúc
      </Space>
    ),
    dataIndex: "to",
    key: "to",
    render: (text: any) => renderSecondaryText(formatDate2(text)),
  },
  {
    title: (
      <Space>
        <NumberOutlined />
        Lương Thỏa thuận
      </Space>
    ),
    dataIndex: "basicSal",
    key: "basicSal",
    render: renderSalary,
  },
  {
    title: (
      <Space>
        <NumberOutlined />
        Lương đóng thuế
      </Space>
    ),
    dataIndex: "taxSal",
    key: "taxSal",
    render: renderSalary,
  },
  {
    title: (
      <Space>
        <NumberOutlined />
        Tổng phụ cấp
      </Space>
    ),
    dataIndex: "tolallowance",
    key: "tolallowance",
    render: renderSalary,
  },
  {
    title: (
      <Space>
        <ContainerOutlined />
        Ghi chú
      </Space>
    ),
    dataIndex: "note",
    key: "note",
    render: renderNote,
  },
  {
    title: (
      <Space>
        <CalendarOutlined />
        Thời gian tạo
      </Space>
    ),
    dataIndex: "createdDate",
    key: "createdDate",
    render: (text: any) => renderSecondaryText(formatDate2(text)),
  },
  {
    title: (
      <Space>
        <CalendarOutlined />
        Thời gian thay đổi
      </Space>
    ),
    dataIndex: "changedDate",
    key: "changedDate",
    render: (text: any) => renderSecondaryText(formatDate2(text)),
  },
];

const EmployeeContract = () => {
  const [searchText] = useState("");

  const filteredData = empContractData.filter((empContract) => {
    if (
      searchText &&
      !empContract.name.toLocaleLowerCase().includes(searchText)
    ) {
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
              Hợp đồng Nhân Viên
            </Title>
          </>
        }
        // footerContent={<div>Home Page Footer</div>}
      >
        <div
          style={{
            margin: "0 0 10px 0",
            border: "1px solid #ccc",
            boxShadow: "0 -2px 8px rgba(0, 0, 0, 0.15)",
          }}
        >
          {/* <TableInput
            searchText={searchText}
            setSearchText={setSearchText}
            showFilter={false}
            showCreateButton={false}
            showRefreshButton={false}
          /> */}
        </div>

        <div>
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
            className="my-table table-content offset-pagination"
          />
        </div>
      </PageLayout>
    </>
  );
};

export default EmployeeContract;
