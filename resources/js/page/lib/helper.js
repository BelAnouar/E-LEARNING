import axiosClient from "../pages/api/axios-client";

export const getCours = async () => {
 
  const response = await axiosClient.get("/cours");

  const {data} = await response.data;
 
  return data;
};


export const getCour = async (idCours) => {
  const response = await axiosClient.get(`/cours/${idCours}`);

  const data = await response.data;
   

  if (data) return data;
};


export  const addcour = async (formData) => {
  try {
    const response = await axiosClient.post("/cours", formData);
    return response.data; 
  } catch (error) {
    throw new Error("Failed to add course");
  }
};


