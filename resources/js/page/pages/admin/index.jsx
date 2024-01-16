import Header from "../../components/header";
import TableUser from "./tableUsers";
import TopDashboard from "./toDashboard";

export default function UserForm() {
    return (
      
            <main className="bg-gray min-vh-100 ">
                <Header />
              <TopDashboard/>
               

                        
                <TableUser/>
            </main>
       
    );
}
