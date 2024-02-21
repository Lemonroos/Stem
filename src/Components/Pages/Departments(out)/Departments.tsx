import {
  ArrowUpOutlined,
  ContactsOutlined,
  EllipsisOutlined,
  MoreOutlined,
  NumberOutlined,
  PhoneOutlined,
  PlusOutlined,
  UserOutlined
} from "@ant-design/icons";
import { Badge, Button, Space, Table } from "antd";
// import PageLayout from "../../ProjectLayOut/PageLayout";
import {
  getColor,
  renderSecondaryText,
  renderSecondaryTextUnderline,
} from "../../Utils/Utilities";
import departmentsData from "../../data/departmentsData";
import employeesData from "../../data/employeesData";
function findManager(department: any) {
  return employeesData.find(
    (employee) =>
      employee.department === department && employee.role === "manager"
  );
}

function updateEmployeeCount(departmentsData: any, employeesData: any) {
  departmentsData.forEach((department: any) => {
    department.employees = employeesData.filter(
      (employee: any) => employee.department === department.name
    ).length;
  });
}
// const { Title } = Typography;
// const  renderSecondaryText = (text) => (
// <Typography.Text strong>{text}</Typography.Text>
// );

const columns: any = [
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
        Tên phòng ban
      </Space>
    ),
    dataIndex: "name",
    key: "name",
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
        <UserOutlined />
        Quản lí
        <div style={{ display: "flex", alignItems: "center" }}>
          <ArrowUpOutlined
            style={{
              marginLeft: "8px",
              // color: sort === "ascend" ? "blue" : undefined,
            }}
          />
        </div>
      </Space>
    ),

    dataIndex: "manager",
    key: "manager",
    render: (record: any) => {
      const manager = findManager(record.name);
      return manager ? renderSecondaryText(manager.name) : null;
    },
    filters: employeesData
      .filter((employee) => employee.role === "manager")
      .map((manager) => ({
        text: manager.name,
        value: manager.name,
      })),
    onFilter: (value: any, record: any) => {
      const manager = findManager(record.name);
      return manager && manager.name.indexOf(value) === 0;
    },
    sorter: (a: any, b: any) => a.manager.length - b.manager.length,
    sortDirections: ["ascend"],
    filterIcon: <MoreOutlined style={{ fontSize: "18px" }} />,
  },
  {
    title: (
      <Space>
        <NumberOutlined />
        Số nhân viên
      </Space>
    ),
    dataIndex: "employees",
    key: "employees",
    render: renderSecondaryText,
  },
  {
    title: (
      <Space>
        <ContactsOutlined />
        Email Quản lý
      </Space>
    ),
    dataIndex: "email",
    key: "email",
    render: (record: any) => {
      const manager = findManager(record.name);
      return manager ? renderSecondaryText(manager.email) : null;
    },
  },
  {
    title: (
      <Space>
        <PhoneOutlined />
        Số Điện Thoại
      </Space>
    ),
    dataIndex: "phone",
    key: "phone",
    render: (record: any) => {
      const manager = findManager(record.name);
      return manager ? renderSecondaryText(manager.phone) : null;
    },
  },
];

const Departments = () => {
  updateEmployeeCount(departmentsData, employeesData);
  return (
    <>
      {/* <PageLayout
        headerContent={
          <>
            <Title level={3} style={{ color: "#000", marginTop: 0 }}>
              Danh Sách Phòng ban yeah
            </Title>
          </>
        }
        // footerContent={<div>Home Page Footer</div>}
      > */}
      <div
        style={{
          padding: "1% 0 5px 0",
          margin: "0 0 10px 0",
          borderBottom: "1px solid #ccc",
          textAlign: "right",
        }}
      >
        <Button type="primary" size={"large"} icon={<PlusOutlined />}>
          Thêm Phòng Ban
        </Button>
      </div>

      <div>
        <Table
          size="large"
          dataSource={departmentsData}
          columns={columns}
          scroll={{
            x: "max-content",
          }}
          style={{
            border: "1px solid #ccc",
            boxShadow: "0 -2px 8px rgba(0, 0, 0, 0.15)",
          }}
          pagination={{
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total}`,
            pageSize: 6,
          }}
          className="my-table"
        />
      </div>
      {/* </PageLayout> */}
    </>
  );
};

export default Departments;