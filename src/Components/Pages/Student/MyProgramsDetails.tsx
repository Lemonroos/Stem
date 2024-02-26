import {
    Card,
    Col,
    Row
} from "antd";

const MyPrograms = () => {

    return (
        <>
            {/* <PageLayout
                headerContent={
                    <>
                        <Title level={3} style={{ color: "#000", marginTop: 0 }}>
                            My Programs
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
                </div> */}

            <div>
                <Row gutter={16}>
                    <Col span={8}>
                        <Card title="Program 1" bordered={false}>
                            Prog1
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card title="Program 2" bordered={false}>
                            Prog2
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card title="Program 3" bordered={false}>
                            Prog3
                        </Card>
                    </Col>
                </Row>
            </div>
            {/* </PageLayout> */}
        </>
    );
};

export default MyPrograms;
