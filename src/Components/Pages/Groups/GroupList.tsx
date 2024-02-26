import {
    Card,
} from "antd";
import { useEffect, useState } from "react";
import { Programs } from "../../models/Programs";

const ProgramGroups = () => {
    const progUrl = "https://stem-backend.vercel.app/api/v1/programs";

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
    // async function countGroupsInAProgram(programId: string) {
    //     try {
    //         const response = await fetch(`https://stem-backend.vercel.app/group/count/countByProgram?programId=${programId}`, {
    //             cache: 'no-store', // Ensure no caching
    //         });
    //         if (!response.ok) {
    //             throw new Error('Network response was not ok');
    //         }
    //         const data = await response.json();
    //         console.log(data);
    //         return data.groupCount;
    //     } catch (error) {
    //         console.error('Error fetching data:', error);
    //         // Handle the error (e.g., show a message to the user)
    //         return 0; // Return an appropriate value or handle the error case
    //     }
    // }
    useEffect(() => {
        fetchPrograms()
    }, [])
    return (
        <>
            <div
            >
                <Card title="Current Programs" loading={programs.length == 0}>
                    {programs.map((program) =>
                        <Card key={program?.Id} type="inner" title={program?.Name} extra={<a href="#" > More</a>}>
                            Groups:
                            {/* {countGroupsInAProgram(program?.Id)} */}
                        </Card>
                    )}
                </Card >
            </div >
        </>
    );
};

export default ProgramGroups;
