import axiosClient from "../pages/api/axios-client";


export const getPayemments = async () => {
 
  const response = await axiosClient.get("payemment");
 console.log(response);
  const {data} = await response.data;
 
  return data;
};


export const getPayemment= async (idP) => {
  const response = await axiosClient.get(`/payemment/${idP}`);
  console.log(response);
  const data = await response.data;
   console.log(data);

  if (data) return data;
};


export  const addpayemment= async (formData) => {
  try {
    const response = await axiosClient.post("/payemment", formData);
    console.log(response);
    return response.data; 
  } catch (error) {
    throw new Error("Failed to add Week");
  }
};



