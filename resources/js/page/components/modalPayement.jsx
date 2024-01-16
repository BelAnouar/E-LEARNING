import { useReducer } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { addpayemment, getPayemments } from "../lib/payemment";






const formReducer = (state, event) => {
    const { name, value, files } = event.target;
    const updatedFormValue = name === 'image' ? files[0] : value;

    return {
        ...state,
        [name]: updatedFormValue
    }
  }
const Payement = (props) => {
    const [formData, setFormData] = useReducer(formReducer, {})
     
    const {data}=props
   
    const Navigate=useNavigate()

    const queryclient=useQueryClient()
    const addMutation=useMutation(addpayemment,{
      onSuccess: (data) => {
        queryclient.prefetchQuery("payement", getPayemments);
         
      
      }
    })
    function handleSubmit(e){
        e.preventDefault()
      
        if (Object.keys(formData).length === 0) {
            alert("Please fill out All fields")
    
            return;
         }
         
    
         const  form= new FormData()
         let {cardNum, dateN, cvv_code, name_card, email}=formData
             form.append('dateN', dateN);
            form.append('email', email);
              form.append('cvv_code', cvv_code);
             form.append('Card_Number', cardNum);
             form.append('name_card', name_card);
             form.append('idCour',data.idCours)
         addMutation.mutate(form)
       }

    
       if(addMutation.isLoading) return <div>Loading!</div>
       if(addMutation.isError) console.log(addMutation.error.message);
       if(addMutation.isSuccess) console.log("Insert is seccess");


    
    return (
        <>
            <div>
      <div className="modals hidden">
        <h2 className="modal__header">Open your bank account</h2>
        
        <div class="row">
            
            
            <div class="col-12">
                <div class="card p-3">
                
                    <div class="card-body border p-0">
                        <p>
                            <a class="btn btn-success p-2 w-100 h-100 d-flex align-items-center justify-content-between"
                                data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="true"
                                aria-controls="collapseExample">
                                <span class="fw-bold">Payemmnt</span>
                               
                            </a>
                        </p>
                        <div class="collapse show p-3 pt-0" id="collapseExample">
                            <div class="row">
                                <div class="col-lg-5 mb-lg-0 mb-3">
                                    <p class="h4 mb-0">Summary</p>
                                    <p class="mb-0"><span class="fw-bold">cours:</span><span class="c-green">: Name of
                                            product "{data.titre}"</span>
                                    </p>
                                    <p class="mb-0">
                                        <span class="fw-bold">Price:</span>
                                        <span class="c-green">:${data.prix}</span>
                                    </p>
                                   
                                </div>
                                <div class="col-lg-7">
                                    <form action="" class="form" onSubmit={handleSubmit}>
                                        <div class="row">
                                            <div class="col-12">
                                                <div class="form__div">
                                                    <input type="text" onChange={setFormData} name="cardNum" class="form-control" placeholder=" "/>
                                                    <label for=""  class="form__label">Card Number</label>
                                                </div>
                                            </div>

                                            <div class="col-6">
                                                <div class="form__div">
                                                    <input type="date" onChange={setFormData} name="dateN" class="form-control" placeholder="date naicanse "/>
                                                    <label for="" class="form__label">MM / yy</label>
                                                </div>
                                            </div>

                                            <div class="col-6">
                                                <div class="form__div">
                                                    <input type="password" onChange={setFormData} name="cvv_code" class="form-control" placeholder=" "/>
                                                    <label for="" class="form__label">cvv code</label>
                                                </div>
                                            </div>
                                            <div class="col-12">
                                                <div class="form__div">
                                                    <input type="text" name="name_card" class="form-control" onChange={setFormData} placeholder=" "/>
                                                    <label for="" class="form__label">name on the card</label>
                                                </div>
                                            </div>
                                            <div class="col-12">
                                                <div class="form__div">
                                                    <input type="email" name="email" class="form-control" onChange={setFormData} placeholder=" "/>
                                                    <label for="" class="form__label">email</label>
                                                </div>
                                            </div>
                                            <div class="col-12">
                                                <button type="submit"  class="btn btn-primary w-100">Sumbit</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          
        </div>
    </div>
      </div>

      <div className="overlay hidden" onClick={()=>{Navigate("/")}}></div>
   
        </>
    );
};

export default Payement;
