import { useParams } from "react-router-dom";
import Header from "../../components/header";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getWeek, getWeeks, updateWeek } from "../../lib/weeks";
import { useReducer, useState } from "react";
import SortIcon from '@mui/icons-material/Sort';

import { toast } from "react-toastify";
import { AddFile } from "../../lib/Files";
import Demo from "./upload";


const Media = () => {

    const { idCour } = useParams();
    const { isLoading, isError, data, error } = useQuery(["Week", idCour], () =>
        getWeek(idCour)
    );
    const queryClient=useQueryClient();
    
    // const [documents, setDocuments] = useState([
    //   { files: [] }
    // ]);
  
    // const addFiles = (fileList, arr) => {
    //   const files = Array.from(fileList);
    //   if(files.length!==0){
    //   arr.push(...files);
    //   setDocuments([...documents]);}
    // };
    
    // const removeFile = (arr, idx) => {
    //   arr.splice(idx, 1);
    //   setDocuments([...documents]); 
    // };

     
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
                <div class="spinner-grow text-success" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    if (isError) {
        return (
            <div className="d-flex justify-content-center ">
                <div class="spinner-grow text-success" role="status">
                    <span class="visually-hidden">{error}</span>
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
                                                         
          {/* <div className="container">
      <input
  type="file"
  className="mb-2"
  onChange={(e) => addFiles(e.target.files, documents[0].files)}
/>

      <div className="panel-group">
        {
          
          documents.map((doc, index) => (
          <div className="panel panel-default xlist" key={index}>
           <div>{data.idweek}</div>
            <form id={`collapse${index}`} className="panel-collapse "  >
              <div className="panel-body">
                
                <ul className="list-group">
                  <li className="list-group-item list-group-item-info">
                    <div className="row">
                      <div className="col-lg-1 col-md-1 col-sm-3 col-xs-3">Sort</div>
                      <div className="col-lg-4 col-md-4 col-sm-7 col-xs-7">Name</div>
                      <div className="col-lg-2 col-md-2 hidden-sm hidden-xs">Size (MB)</div>
                      <div className="col-lg-2 col-md-2 hidden-sm hidden-xs">Type</div>
                      <div className="col-lg-2 col-md-2 hidden-sm hidden-xs">Modified on</div>
                      <div className="col-lg-1 col-md-1 col-sm-1 col-xs-2"></div>
                    </div>
                  </li>
                  {doc.files.length === 0 && (
                    <li className="list-group-item">Drop Images or PDFs files here.</li>
                  )}
                  {doc.files.map((file, fileIndex) => (
                    <li className="list-group-item xlist" key={fileIndex}>
                      <div className="row">
                        <div className="col-lg-1 col-md-1 col-sm-3 col-xs-3">
                          <div className="row">
                            <div className="col-xs-4" style={{ paddingTop: '5px' }}>
                              <SortIcon/>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-11 col-md-11 col-sm-7 col-xs-7">
                          <div className="row">
                            <div className="col-lg-5 col-md-5 col-sm-11 col-xs-10 wraptext">{file.name}</div>
                            <div className="col-lg-2 col-md-2 hidden-sm hidden-xs">
                              {(file.size / 1024 / 1024).toPrecision(2)}
                            </div>
                            <div className="col-lg-2 col-md-2 hidden-sm hidden-xs">{file.type}</div>
                            <div className="col-lg-2 col-md-2 hidden-sm hidden-xs">{new Date(file.lastModified).toLocaleDateString()}</div>
                            <div className="col-lg-1 col-md-1 col-sm-1 col-xs-2">
                              <button type="button" className="btn btn-xs btn-danger" onClick={() => removeFile(doc.files, fileIndex)}>
                                <span><i className="fa fa-trash"></i></span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <button type='submit' onClick={(event)=>{handleSubmit(event,input.idweek)}}>n</button>
              </div>
            </form>
          </div>
        ))}
      </div>
    </div> */}
                                                         {/* Demo */}
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
