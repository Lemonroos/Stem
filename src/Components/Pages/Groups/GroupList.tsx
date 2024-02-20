import {
    Card,
    // Typography
} from "antd";
// import PageLayout from "../../ProjectLayOut/PageLayout";
import { useEffect, useState } from "react";
// import { GroupList } from "../../models/Groups";
import { Programs } from "../../models/Programs";
// const { Title } = Typography;


const ProgramGroups = () => {
    const progUrl = "https://stem-backend.vercel.app/program";
    const [programs, setPrograms] = useState<Programs[]>([]);
    function fetchPrograms() {
        fetch(progUrl)
            .then((res) => res.json()) // Parse the response as JSON
            .then((data) => {
                setPrograms(data); // Log the data to the console
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            })
    }
    useEffect(() => {
        fetchPrograms()
    }, [])
    return (
        <>
            {/* <PageLayout
                headerContent={
                    <>
                        <Title level={3} style={{ color: "#000", marginTop: 0 }}>
                            Groups in Programs Hehe
                        </Title>
                    </>
                }
            >
                <div
                    style={{
                        margin: "0 0 10px 0",
                        border: "1px solid #ccc",
                        boxShadow: "0 -2px 8px rgba(0, 0, 0, 0.15)",
                    }}
                >
                </div> */}

                <div
                >
                    <Card title="Current Programs" loading={programs.length == 0}>
                        {programs.map((program) =>
                            <Card type="inner" title={program?.Name} extra={<a href="#" > More</a>}>
                                Groups: 50
                            </Card>
                        )}
                    </Card >
                </div >
            {/* </PageLayout > */}
        </>
    );
};

export default ProgramGroups;
