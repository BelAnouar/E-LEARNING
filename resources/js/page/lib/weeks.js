import axiosClient from "../pages/api/axios-client";

export const getWeeks = async (key) => {
    const idCour = key.queryKey[1];
    console.log(idCour);
    const response = await axiosClient.get(`/weeks?idCour=${idCour}`);

    const { data } = await response.data;
    console.log(data);
    return data;
};

export const getWeek = async (idweek) => {
    try {
        const response = await axiosClient.get(`/weeks/${idweek}`);
        const data = await response.data;
        return data;
    } catch (error) {
        throw new Error("Failed found  Week");
    }

    
};

export const addWeek = async (formData) => {
    try {
        const response = await axiosClient.post("/weeks", formData);
        console.log(response);
        return response.data;
    } catch (error) {
        throw new Error("Failed to add Week");
    }
};



export async function updateWeek(idweek, formData) {

  const response =  await axiosClient.put(`/weeks/${idweek}`, formData);
  
  console.log(response);
  const json = await response.data;
  return json;
}