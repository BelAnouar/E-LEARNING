import Header from "../../components/header";
import StatisticsDashboard from "./StatisticsDashboard";
import TableUser from "./tableUsers";
import TopDashboard from "./toDashboard";

export default function AdminDashboard() {
    return (
      
            <main className="bg-gray min-vh-100 ">
                <Header />
                  <StatisticsDashboard />
                <TopDashboard/>
               

                        
                <TableUser/>
            </main>
       
    );
}
