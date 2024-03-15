// api.js
import axios from "axios";

export const fetchNews = async () => {
    const response = await axios.get('https://stem-backend.vercel.app/api/v1/news');
    return response.data;
};

export const fetchSchoolYears = async () => {
    const response = await axios.get('https://stem-backend.vercel.app/api/v1/school-year');
    return response.data;
};

export const fetchProgramsByStudent = async (userId: any) => {
    const response = await axios.get(`https://stem-backend.vercel.app/api/v1/members/programs-of-a-student?StudentId=${userId}`);
    return response.data;
};

export const fetchAllPrograms = async () => {
    const response = await axios.get('https://stem-backend.vercel.app/api/v1/programs');
    return response.data;
};
