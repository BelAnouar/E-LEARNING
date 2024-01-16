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
    return response.data; // Include the newly created course object with the ID
  } catch (error) {
    throw new Error("Failed to add course");
  }
};



// Update a new user
export async function updateJob(jobId, formData) {
  const Options = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  };

  const response = await fetch(`${BASE_URL}api/job`, Options);
  const json = await response.json();
  return json;
}

// Delete a new user
export async function deleteJob(jobId) {
  const Options = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  };

  const response = await fetch(`${BASE_URL}api/job/${jobId}`, Options);
  const json = await response.json();
  return json;
}
