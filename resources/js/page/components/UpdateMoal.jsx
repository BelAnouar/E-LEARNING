





 const UpdateModal=()=>{

    return(
        
        <div className="position-relative z-3" aria-labelledby="modal-title" role="dialog" aria-modal="true">
  <div className="position-absolute top-0 end-0  bg-gray-500" style={{ opacity: 0.75 }}></div>
  <div className=" overflow-auto">
    <div className="d-flex align-items-end justify-content-center p-4 text-center flex-sm-row flex-column-reverse">
      <section className="col-8 col-md-11 position-relative  m-3 p-7 border rounded-lg bg-white">
        <h2 className="mb-4 d-inline-block">Repport...!</h2>
        <div className="alert alert-info">
        <p >Please ensure that all required information has been entered.</p>
        <p>Click Repport and send your Repport</p>
</div>
        <div className="bg-gray-50 px-4 py-3 d-flex flex-row-reverse justify-content-between">
          <button type="button" className="mt-3 d-inline-flex justify-content-center rounded-md bg-danger px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm border-1 border-inset border-gray-300 hover:bg-yellow-50 sm:mt-0 sm:w-auto">Repport!</button>
          <button  type="button" onClick={()=>{navigate("/addcours")}} className="mt-3 d-inline-flex justify-content-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm border-1 border-inset border-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
        </div>
      </section>
    </div>
  </div>
</div>


    );
}

export default UpdateModal