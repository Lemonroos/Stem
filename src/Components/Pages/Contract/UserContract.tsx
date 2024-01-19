import React from "react";
import { Typography, Space, Row, Col } from "antd";
import PageLayout from "../../ProjectLayOut/PageLayout";
import empContractData from "../../data/userContractData";
import {
  getColor,
  renderBoldText,
  formatDate,
  formatCurrency,
} from "../../Utils/Utilities";

const { Title, Text, Paragraph } = Typography;

const Employees = () => {
  const {
    employeeName,
    gender,
    dob,
    idNumber,
    address,
    phoneNumber,
    department,
    contractType,
    startDate,
    endDate,
    baseSalary,
    taxableSalary,
    allowances,
    paymentMethod,
    bankAccountNumber,
    accountHolderName,
    bankName,
    workingDaysPerWeek,
    dependents,
    notes,
  } = empContractData;

  const formattedDob = formatDate(dob);
  const formattedStartDate = formatDate(startDate);
  const formattedEndDate = formatDate(endDate);
  const formattedBaseSalary = formatCurrency(baseSalary);
  const formattedTaxableSalary = formatCurrency(taxableSalary);

  return (
    <>
      <PageLayout
        headerContent={
          <>
            <Title level={3} style={{ color: "#000", marginTop: 0 }}>
              Hợp đồng của tôi
            </Title>
          </>
        }
        footerContent={<div>Home Page Footer</div>}
      >
        <div>
          {/* <Space direction="vertical"> */}

          <Row>
            <Col xs={24}>
              <Title className="user-title-3" level={3}>
                Thông tin hợp đồng
              </Title>
            </Col>
          </Row>
          <Row>
            <Col xs={1} />
            <Col xs={23}>
              <Title level={3} className="user-title-3">
                Thông tin người lao động
              </Title>
            </Col>
          </Row>
          <Row>
            <Col xs={2} />
            <Col xs={3}>
              <Text strong> Họ và tên:</Text>
            </Col>
            <Col xs={8}>
              <Text type="secondary">{employeeName}</Text>
            </Col>
            <Col xs={3}>
              <Text strong> Giới tính:</Text>
            </Col>
            <Col xs={8}>
              <Text type="secondary">{gender}</Text>
            </Col>
          </Row>
          <Row>
            <Col span={2} />
            <Col span={3}>
              <Text strong> Sinh ngày:</Text>
            </Col>
            <Col span={19}>
              <Text type="secondary">{formattedDob}</Text>
            </Col>
          </Row>
          <Row>
            <Col span={2} />
            <Col span={3}>
              <Text strong> CMND|CCCD:</Text>
            </Col>
            <Col span={19}>
              <Text type="secondary">{idNumber}</Text>
            </Col>
          </Row>
          <Row>
            <Col span={2} />
            <Col span={3}>
              <Text strong> Địa chỉ:</Text>
            </Col>
            <Col span={19}>
              <Text type="secondary">{address}</Text>
            </Col>
          </Row>
          <Row>
            <Col span={2} />
            <Col span={3}>
              <Text strong> Số điện thoại:</Text>
            </Col>
            <Col span={19}>
              <Text type="secondary">{phoneNumber}</Text>
            </Col>
          </Row>

          <Row>
            <Col span={1} />
            <Col span={23}>
              <Title level={3} className="user-title-3">
                Hợp đồng lao động
              </Title>
            </Col>
          </Row>
          <Row>
            <Col span={1} />
            <Col span={23}>
              <Title level={4} className="user-title-4">
                1. Công việc, phòng ban và thời gian hợp đồng
              </Title>
            </Col>
          </Row>
          <Row>
            <Col span={2} />
            <Col span={3}>
              <Text strong> Phòng ban công tác:</Text>
            </Col>
            <Col span={19}>
              <Text type="secondary">{department}</Text>
            </Col>
          </Row>
          <Row>
            <Col span={2} />
            <Col span={3}>
              <Text strong> Loại hợp đồng:</Text>
            </Col>
            <Col span={19}>
              <Text type="secondary">{contractType}</Text>
            </Col>
          </Row>
          <Row>
            <Col span={2} />
            <Col span={3}>
              <Text strong> Từ ngày:</Text>
            </Col>
            <Col span={8}>
              <Text type="secondary">{formattedStartDate}</Text>
            </Col>
            <Col span={3}>
              <Text strong> Đến ngày:</Text>
            </Col>
            <Col span={8}>
              <Text type="secondary">{formattedEndDate}</Text>
            </Col>
          </Row>

          <Row>
            <Col span={1} />
            <Col span={23}>
              <Title level={4} className="user-title-4">
                2. Lương, phụ cấp và các khoản bổ sung khác
              </Title>
            </Col>
          </Row>

          <Row>
            <Col span={2} />
            <Col span={3}>
              <Text strong>Lương căn bản:</Text>
            </Col>
            <Col span={8}>
              <Text type="secondary">{formattedBaseSalary}</Text>
            </Col>
            <Col span={3}>
              <Text strong> Lương tính thuế</Text>
            </Col>
            <Col span={8}>
              <Text type="secondary">{formattedTaxableSalary}</Text>
            </Col>
          </Row>

          <Row>
            <Col span={2} />
            <Col span={3}>
              <Text strong> Các phụ cấp(mỗi tháng):</Text>
            </Col>
            <Col span={19}>
              {allowances}
              {/* {Object.entries(empContractData.allowances).map(
                ([key, value]) => (
                  <div key={key}>
                    <Text>{key}: </Text>
                    <Text type="secondary">{value.toLocaleString()} VND</Text>
                  </div>
                )
              )} */}
            </Col>
          </Row>

          <Row>
            <Col span={2} />
            <Col span={3}>
              <Text strong> Hình thức trả lương:</Text>
            </Col>
            <Col span={19}>
              <Text type="secondary">{paymentMethod}</Text>
            </Col>
          </Row>

          <Row>
            <Col span={3} />
            <Col span={3}>
              <Text> Số TK ngân hàng:</Text>
            </Col>
            <Col span={18}>
              <Text type="secondary">{bankAccountNumber}</Text>
            </Col>
          </Row>
          <Row>
            <Col span={3} />
            <Col span={3}>
              <Text> Chủ tài khoản:</Text>
            </Col>
            <Col span={18}>
              <Text type="secondary">{accountHolderName}</Text>
            </Col>
          </Row>
          <Row>
            <Col span={3} />
            <Col span={3}>
              <Text> Ngân hàng:</Text>
            </Col>
            <Col span={18}>
              <Text type="secondary">{bankName}</Text>
            </Col>
          </Row>

          <Row>
            <Col span={1} />
            <Col span={23}>
              <Title level={4} className="user-title-4">
                3. Thời gian làm việc và ghi chú
              </Title>
            </Col>
          </Row>

          <Row>
            <Col span={2} />
            <Col span={4}>
              <Text strong> Số ngày làm việc một tuần:</Text>
            </Col>
            <Col span={18}>
              <Text type="secondary">{workingDaysPerWeek}</Text>
            </Col>
          </Row>

          <Row>
            <Col span={2} />
            <Col span={4}>
              <Text strong> Số người phụ thuộc:</Text>
            </Col>
            <Col span={18}>
              <Text type="secondary">{dependents.length}</Text>
            </Col>
          </Row>

          <Row>
            <Col span={2} />
            <Col span={4}>
              <Text strong> Ghi chú:</Text>
            </Col>
            <Col span={18}>
              <Paragraph>
                <Text type="secondary">{notes} </Text>
              </Paragraph>
            </Col>
          </Row>
        </div>
      </PageLayout>
    </>
  );
};

export default Employees;
