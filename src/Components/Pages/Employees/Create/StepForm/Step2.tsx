// Step2.js
import { CaretDownOutlined } from "@ant-design/icons";
import { Col, DatePicker, Form, Input, Radio, Row, Select } from "antd";
const { Option } = Select;

const Step2 = ({ }) => (
  <>
    
    <Row gutter={16}>
      <Col span={12}>
        <Form.Item
          label="Họ"
          name="surname"
          // rules={[{ required: true, message: "Please enter the name" }]}
          className="custom-form-item"
        >
          <Input size="large" placeholder="Nhập họ" />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          label="Tên"
          name="firstname"
          // rules={[{ required: true, message: "Please enter the name" }]}
          className="custom-form-item"
        >
          <Input size="large" placeholder="Nhập tên" />
        </Form.Item>
      </Col>
    </Row>
    <Row gutter={16}>
      <Col span={12}>
        <Form.Item
          label="Giới tính"
          name="gender"
          // rules={[{ required: true, message: "Please select the gender" }]}
          className="custom-form-item"
        >
          <Radio.Group size="large">
            <Radio value="Nam">Nam</Radio>
            <Radio value="Nữ">Nữ</Radio>
          </Radio.Group>
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          label="Quốc tịch"
          name="country"
          // rules={[
          //   {
          //     required: true,
          //     message: "Please enter the country you are from",
          //   },
          // ]}
          className="custom-form-item"
        >
          <Input size="large" placeholder="Nhập quốc tịch" />
        </Form.Item>
      </Col>
    </Row>
    <Row gutter={16}>
      <Col span={12}>
        <Form.Item
          label="Số diện thoại"
          name="phone"
          // rules={[{ required: true, message: "Please enter the phone number" }]}
          className="custom-form-item"
        >
          <Input size="large" />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          label="Ngày sinh"
          name="birthdate"
          // rules={[{ required: true, message: 'Please select the birthdate' }]}
          className="custom-form-item"
        >
          <DatePicker size="large" format="DD/MM/YYYY" />
        </Form.Item>
      </Col>
    </Row>
    <Row gutter={16}>
      <Col span={24}>
        <Form.Item
          label="Địa chỉ:"
          name="address"
          // rules={[{ required: true, message: 'Please enter the address' }]}
          className="custom-form-item"
        >
          <Input size="large" placeholder="Nhập địa chỉ" />
        </Form.Item>
      </Col>
    </Row>
    <Row gutter={16}>
      <Col span={12}>
        <Form
          initialValues={{
            department: "Finance",
          }}
        >
          <Form.Item
            label="Department"
            name="department"
            // rules={[
            //   { required: true, message: "Please select the department" },
            // ]}
            className="custom-form-item"
          >
            <Select size="large" suffixIcon={<CaretDownOutlined />}>
              <Option value="Finance">Phòng Kế Toán</Option>
              <Option value="Human Resource">Phòng Nhân Sự</Option>
              <Option value="Sales">Phòng Kinh Doanh</Option>
              <Option value="Marketing">Phòng Tiếp Thị</Option>
              <Option value="Operations">Phòng Vận Hành</Option>
              <Option value="Engineering">Phòng Kỹ Thuật</Option>
              <Option value="Customer Support">Phòng Hỗ Trợ Khách Hàng</Option>
              <Option value="Research & Development">
                Phòng Nghiên Cứu Và Phát Triển
              </Option>
              <Option value="Quality Assurance">
                Phòng Đảm Bảo Chất Lượng
              </Option>
              <Option value="Design">Phòng Thiết Kế</Option>
              <Option value="Chăm sóc khách hàng">
                Phòng Chăm Sóc Khách Hàng
              </Option>
            </Select>
          </Form.Item>
          
        </Form>
      </Col>
     

      <Col span={12}>
        <Form.Item
          label="CCCD|CMND"
          name="idnumber"
          
          // rules={[
          //   { required: true, message: "Please enter the goverment's ID" },
          // ]}
          className="custom-form-item"
        >
          <Input size="large" placeholder="Nhập CCCD|CMND" />
        </Form.Item>
      </Col>
    </Row>
    <Row gutter={16}>
      <Col span={12}>
        <Form.Item
          label="Tên tài khoản ngân hàng"
          name="bankaccname"
          // rules={[{ required: true, message: "Please enter the " }]}
          className="custom-form-item"
        >
          <Input size="large" placeholder="Nhập tên tài khoản ngân hàng" />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          label="Số tài khoản ngân hàng"
          name="bankaccnumber"
          // rules={[{ required: true, message: "Please enter the " }]}
          className="custom-form-item"
        >
          <Input size="large" placeholder="Nhập số tài khoản ngân hàng" />
        </Form.Item>
      </Col>
    </Row>
    <Row gutter={16}>
      
      <Col span={24}>
        <Form.Item
          label="Ngân hàng"
          name="bankname"
          // rules={[{ required: true, message: "Please enter the email" }]}
          className="custom-form-item"
        >
          <Input size="large" placeholder="Nhập ngân hàng" />
        </Form.Item>
      </Col>
    </Row>
  </>
);

export default Step2;
