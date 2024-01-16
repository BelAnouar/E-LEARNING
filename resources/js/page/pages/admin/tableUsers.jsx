import { useQuery, useQueryClient } from "react-query";
import { deleteUser, getUsers } from "../../lib/user";










const TableUser=()=>{
    const { isLoading, isError, data, error } = useQuery("users",getUsers);
     
     if (isLoading) return (<><div>data is Loading</div></>);
     if (isError) return <div>Got Error{error}</div>;
   
     if (Object.keys(data).length === 0) return <div>data is Empty</div>;
     const queryClient = useQueryClient();
     const DeleteUser= async(id)=>{
                await deleteUser(id);
                await queryClient.prefetchQuery("users" ,getUsers);

     }
 
    return(
        <>
            
                           
                                <div className="w-90 card p-2 m-3">
                                    <div className="card-body">
                                        <div className="d-md-flex">
                                            <div>
                                                <h4 className="card-title mb-1">
                                                   User
                                                </h4>
                                              
                                            </div>
                                            
                                        </div>

                                        <div className="table-responsive">
                                            <table className="table mb-0 table-hover align-middle text-nowrap">
                                                <thead>
                                                    <tr>
                                                        <th className="border-top-0">
                                                            Fullname
                                                        </th>
                                                        <th className="border-top-0">
                                                            Email
                                                        </th>
                                                        <th className="border-top-0">
                                                        name
                                                        </th>
                                                        <th className="border-top-0">
                                                        role
                                                        </th>
                                                        <th className="border-top-0">
                                                            country
                                                        </th>
                                                        <th className="border-top-0">
                                                            Update
                                                        </th>
                                                        <th className="border-top-0">
                                                            Delete
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                {data.map((Items,index)=>{
                                                    return(<tr>
                                                        <td>
                                                            <div className="d-flex align-items-center">
                                                                <div className="mr-2">
                                                                    <a className="btn btn-circle d-flex btn-info text-white">
                                                                        {Items.fullName?.charAt(0)}
                                                                    </a>
                                                                </div>
                                                                <div className="ms-2">
                                                                    <h4 className="mb-0 font-16">
                                                                        {Items.fullName}
                                                                    </h4>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>{Items.email}</td>
                                                        <td>{Items.name}</td>
                                                        <td>
                                                            <label className="badge bg-danger">
                                                                {Items.role}
                                                            </label>
                                                        </td>
                                                        <td>{Items.country}</td>
                                                        <td><button type="button" className="btn btn-success">Update</button></td>
                                                        <td>
                                                        <button type="button" onClick={async () => { await DeleteUser(Items.id)}} className="btn btn-danger">Delete</button>
                                                        </td>
                                                    </tr>)
                                                })}
                                                    
                                                   
                                                   
                                                             
                                                        
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                        </>
    )
}


export default TableUser