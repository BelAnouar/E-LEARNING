import { useParams } from "react-router-dom";
import Header from "../../components/header";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getWeek, getWeeks, updateWeek } from "../../lib/weeks";

import { AddFile } from "../../lib/Files";
import Demo from "./upload";


const Media = () => {

    const { idCour } = useParams();
    const { isLoading, isError, data, error } = useQuery(["Week", idCour], () =>
        getWeek(idCour)
    );
    const queryClient=useQueryClient();
    
     
    const queryclient=useQueryClient()
    const addMutation=useMutation(AddFile,{
        onSuccess:()=>{
            queryclient.prefetchQuery("file",getWeeks)
        }
    })
   
    const handleSubmit=async(id,documents)=>{
      event.preventDefault();
     
      const  form= new FormData()
     documents[0].files.forEach((file) => {
      console.log(file);
      const {name,type}=file
      console.log(name);
      const model={idWeek:id,name,size:(file.size / 1024 / 1024).toPrecision(2),type,lastModified:new Date(file.lastModified).toLocaleDateString(),File:file}
      form.append('idWeek', id);
      form.append('size', (file.size / 1024 / 1024).toPrecision(2));
      form.append('type', type);
      form.append('name', name);
      form.append('lastModified', file.lastModified);
      form.append('File',file);
      
      addMutation.mutate(form)
     })
    }
   
  
    if (isLoading)
        return (
            <div className="d-flex justify-content-center ">
                <div className="spinner-grow text-success" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    if (isError) {
        return (
            <div className="d-flex justify-content-center ">
                <div className="spinner-grow text-success" role="status">
                    <span className="visually-hidden">{error}</span>
                </div>
            </div>
        );
    }
   

   
    

    return (
        <>
            <main className="bg-gray-100 min-vh-100 dark:bg-slate-800">
                <Header />
                <div className="card">
      <div className="card-body">
        <h2 className="mb-3 font-bold">Add Content Cour</h2>
        <span className="text-black font-normal">
          Please ensure that all required information has been entered.
        </span>

        <main className="g-5 py-4 " >
          {data.map((input, index) => (
            <div className="mb-3 card p-3  bg-secondary bg-opacity-25  " key={index}>
            <h5>Content</h5>
            <div className="d-flex  ">
              <div className="form-floating mb-2 flex-grow-1 me-1">
                <input
                  type="text"  
                  className="form-control border border-dark rounded-0 "
                  placeholder="Enter titre"
                  name="titre"
                  defaultValue={input.titre}
                
                />
                <label>Enter Titre</label>
              </div>
              <div className="form-floating mb-2 flex-grow-1 ms-1">
                <input
                  type="text"
                  className="form-control border border-dark rounded-0 "
                  placeholder="Enter description"
                  name="description" 
                  defaultValue={input.description}
               
                />
                <label>Enter Description</label>
              </div>
            </div>
            <div className="d-flex justify-content-end">
            <button onClick={(event)=>handleUpdate(event,input.idweek)}
            className="btn btn-success "
          
          >
            Update
          </button>  
          
          
          </div>
                                                         {/* Demo */}
           <Demo onhandleSubmit={handleSubmit} data={input}/>
                                                         
       
            </div>
          ))}
         
        </main>
      </div>
    </div>
            </main>
        </>
    );
};

export default Media;
