import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Programs } from "../../models/Programs";
import axios from "axios";

const MyPrograms = () => {
    const progUrl = "https://stem-backend.vercel.app/api/v1/programs";
    const progId = Number(useParams().id);
    const [programDetails, setProgramDetails] = useState<Programs>()

    async function getProgramById(id: number) {
        await axios.get(`${progUrl}/${id}`)
            .then(data => setProgramDetails(data.data))
            .catch(err => console.error(err))
    }
    useEffect(() => {
        getProgramById(progId);
    }, [progId])
    return (
        <>
            {programDetails &&
                <div>
                    {programDetails.Name}
                </div>
            }
        </>
    );
};

export default MyPrograms;
