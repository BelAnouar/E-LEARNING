import axiosClient from "../pages/api/axios-client";

export const getFiles = async () => {
   
    const response = await axiosClient.get(`/File`);
    const { data } = await response.data;
    console.log(data);
    return data;
};
export const AddFile= async (formData) => {
    try {
        console.log(formData);
        const response = await axiosClient.post("/File", formData);
        console.log(response);
        return response.data;
    } catch (error) {
        throw new Error("Failed to add file");
    }
};

export const getFilesByWeek = async (idWeek) => {
 
   const response = await axiosClient.get(`/files/week/${idWeek}`);
    const { data } = await response.data;
    console.log(data);
    return data;
};