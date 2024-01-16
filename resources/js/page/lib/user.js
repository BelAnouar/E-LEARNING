import axiosClient from "../pages/api/axios-client";


export const getUsers = async () => {
 
  const response = await axiosClient.get("/users");

  const {data} = await response.data;
 
  return data;
};



export async function deleteUser(Id) {
   
    const response = await axiosClient.delete(`users/${Id}`);
    const json = await response.data;
    return json;
  }
  