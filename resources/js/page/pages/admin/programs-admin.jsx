import Header from "../../components/header";
import { ProgramsTable } from "../../components/programs-table";







const ProgramsAdmin=()=>{
    return(
        <main className="bg-gray min-vh-100 ">
                <Header />
                <ProgramsTable/>
                </main>
    );
}

export default  ProgramsAdmin