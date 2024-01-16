
import { useReducer, useState } from "react";
import axiosClient from "../api/axios-client";
import Header from "../../components/header";
import { useMutation, useQueryClient } from "react-query";
import { addcour, getCours } from "../../lib/helper";
import { useNavigate } from "react-router-dom";



const formReducer = (state, event) => {
    const { name, value, files } = event.target;
    const updatedFormValue = name === 'image' ? files[0] : value;

    return {
        ...state,
        [name]: updatedFormValue
    }
  }



const AddCours =()=>{
    const [formData, setFormData] = useReducer(formReducer, {})
    let navigate = useNavigate();

    const queryclient=useQueryClient()
    const addMutation=useMutation(addcour,{
      onSuccess: (data) => {
        queryclient.prefetchQuery("cours", getCours);
         navigate(`/content/${data.idCours}`);
      
      }
    })
    

    function handleSubmit(e){
        e.preventDefault()
        if (Object.keys(formData).length === 0) {
           alert("Please fill out All fields")
   
           return;
        }
        const  form= new FormData()
        let {titre,image,description,enseignant,prix}=formData
      
            form.append('titre', titre);
           form.append('description', description);
             form.append('image', image);
            form.append('prix', prix);
            form.append('enseignant', enseignant);
     
        addMutation.mutate(form)
       }



if(addMutation.isLoading) return( <div class="spinner-grow text-success" role="status">
<span class="visually-hidden">Loading...</span>
</div>)
if(addMutation.isError) console.log(addMutation.error.message);
if(addMutation.isSuccess){ console.log("Insert is seccess")
     
}
    return(
      <> <main className="bg-gray-100 min-vh-100 dark:bg-slate-800">
     
        <Header/>
       
 
        
                <section className="w-70 col-md-11 relative lg:h-80vh h-15vh m-3 p-4 border rounded-3 bg-white">
                    <h2 className="mb-3 font-bold ">Add Cour</h2>
                    <span className="text-black font-normal "> Please ensure that all required information has been entered.</span>

                    <form className="row g-5 py-4" onSubmit={handleSubmit} >
                        <div className="col-md-4">
                            <label htmlFor="image" className="form-label">Image:</label>
                            <input type="file" onChange={setFormData} className="form-control" name="image" id="image"/>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="titre" className="form-label">Titre:</label>
                            <input type="text" onChange={setFormData} id="titre" name="titre" className="form-control" placeholder="Titre" />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="enseignant" className="form-label">Enseignant:</label>
                            <input type="text" onChange={setFormData}  id="enseignant" name="enseignant" className="form-control" placeholder="Enseignant:" />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="description" className="form-label">Description:</label>
                            <textarea id="description" onChange={setFormData} name="description" className="form-control"  aria-label="With textarea"></textarea>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="prix" className="form-label">Prix:</label>
                            <input type="text"  onChange={setFormData} id="prix" name="prix" className="form-control" placeholder="Prix" />
                        </div>
                        <div className="">
                           <button type="submit" className="btn btn-primary col-md-4">
                                Add 
                            </button>
                        </div>
                        
                    </form>
                </section>
            
        </main>
        </>
    )
}




export default AddCours