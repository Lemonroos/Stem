import {
    Card,
    Typography
} from "antd";
import PageLayout from "../../ProjectLayOut/PageLayout";

const { Title, Text } = Typography;


const MyPrograms = () => {

    return (
        <>
            <PageLayout
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
                </div>

                <div
                >
                    <Card title="Current Programs">
                        <Card type="inner" title="Program 1" extra={<a href="#">More</a>}>
                            Groups: 50
                        </Card>
                        <Card
                            style={{ marginTop: 16 }}
                            type="inner"
                            title="Program 2"
                            extra={<a href="#">More</a>}
                        >
                            Groups: 45
                        </Card>
                    </Card>
                </div>
            </PageLayout>
        </>
    );
};

export default MyPrograms;
