import React, { useReducer, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getCour } from "../../lib/helper";
import Modal from "../../components/Modal";
import { addWeek, getWeeks } from "../../lib/weeks";
import { toast } from "react-toastify";
import Header from "../../components/header";

const Content = () => {
  const { idcour } = useParams();
  let navigate = useNavigate();
  const { isLoading, isError, data, error } = useQuery(
    ["Cours", idcour],
    () => getCour(idcour)
  );

  const [inputs, setInputs] = useState([{ titre: "", description: "" }]);

  const queryclient = useQueryClient();

  const handleAddField = (event) => {
    event.preventDefault();
    setInputs([...inputs, { titre: "", description: "" }]);
  };

  const addMutation = useMutation(addWeek, {
    onSuccess: (data) => {
      queryclient.prefetchQuery("weeks", getWeeks);
      navigate(`/Media/${data.idCour}`);
    }
  });

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const updatedInputs = [...inputs];
    updatedInputs[index][name] = value;
    setInputs(updatedInputs);
  };

  const handleRemoveField = (index) => {
    const updatedInputs = [...inputs];
    updatedInputs.splice(index, 1);
    setInputs(updatedInputs);
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (
      inputs.length === 0 ||
      inputs.some((input) => !input.titre || !input.description)
    ) {
      toast("Please fill out all fields", {
        hideProgressBar: true,
        autoClose: 4000,
        type: "error",
        position: "top-center"
      });
      return;
    }
     inputs.forEach((input) => {
        const { titre, description } = input;
        addMutation.mutate({ idCour: idcour, titre, description });
      });
  }

  if (isLoading) return <div className="d-flex justify-content-center "><div class="spinner-grow text-success" role="status">
  <span class="visually-hidden">Loading...</span>
</div></div>
  if (isError) return <Modal />;
  if(addMutation.isLoading) return <div><div class="spinner-grow text-success" role="status">
  <span class="visually-hidden">Loading...</span>
</div></div>
    if(addMutation.isError) toast(addMutation.error.message,{hideProgressBar:true,autoClose:4000,type:"warning",position:"top-center"});
    if(addMutation.isSuccess) toast("Insert is seccess",{hideProgressBar:true,autoClose:4000,type:"success",position:"top-center"})
  return (

    <> <main className="bg-gray-100 min-vh-100 dark:bg-slate-800">
    <Header />
    <div className="card">
      <div className="card-body">
        <h2 className="mb-3 font-bold">Add Content Cour</h2>
        <span className="text-black font-normal">
          Please ensure that all required information has been entered.
        </span>

        <form className="g-5 py-4">
          {inputs.map((input, index) => (
            <div className="mb-3 card p-3  bg-secondary bg-opacity-25" key={index}>
            <h5>Content</h5>
              <div className="form-floating mb-2">
                <input
                  type="text"
                  className="form-control border border-dark rounded-0"
                  placeholder="Enter titre"
                  name="titre"
                  value={input.titre}
                  onChange={(event) => handleChange(index, event)}
                />
                <label>Enter Titre</label>
              </div>
              <div className="form-floating mb-2">
                <input
                  type="text"
                  className="form-control border border-dark rounded-0"
                  placeholder="Enter description"
                  name="description"
                  value={input.description}
                  onChange={(event) => handleChange(index, event)}
                />
                <label>Enter Description</label>
              </div>
              {index > 0 && (
                <button
                  className="btn btn-danger btn-sm col-2"
                  onClick={() => handleRemoveField(index)}
                >
                  Remove Field
                </button>
              )}
            </div>
          ))}
          <div className="d-flex justify-content-between ">
          <button
            className="btn btn-outline-primary"
            onClick={handleAddField}
          >
            Add fields
          </button>
          <button
            className="btn btn-outline-info"
            onClick={handleSubmit}
          >
            Add content
          </button></div>
        </form>
      </div>
    </div>
  </main>  </>);
};

export default Content;
