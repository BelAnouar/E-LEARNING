import { createBrowserRouter} from "react-router-dom";

import Error from "../components/Error"
import Books from "../pages/Books";
import Contact from "../pages/contact";
import Courses from "../pages/coursesPage";
import FAQ from "../pages/FAQ";
import Home from "../pages/homePage";
import Lesson from "../pages/leson";
import Programs from "../pages/Program&Degrees";
import Register from "../pages/Register";
import SignIn from "../pages/signin";
import FilterCard from "../pages/filtercard";

import Sidbar from "../components/sidebare";
import UserForm from "../pages/admin";
import AddCours from "../pages/admin/addcours";
import Content from "../pages/admin/content";
import RegisterAdmin from "../pages/admin/RegisterAdmn";
import Media from "../pages/admin/Medai";


const router=createBrowserRouter([
    {
        path:'*' ,element:<Error/>
    },{
        path:'/' ,element:<Home/>
    }
    ,{
        path:'/courses',element:<Courses/>
    },{
             path:"/Books",element:<Books/>
    },{
        path:"/Program&Degrees",element:<Programs/>
    },{
        path:"/SignIn",element:<SignIn/>
    },{
        path:"/Register",element:<Register/>
    },{
        path:"/lesson/:idCours",element:<Lesson/>
    },{
        path:"/contact",element:<Contact/>
    },{
        path:"/FAQ",element:<FAQ/>
    },{
        path:"/Find" ,element:<FilterCard/>
    },
    
    {element: <Sidbar/>,
    children: [{
        path:"/admin" ,element:<UserForm/>
    },{
        path:"/addcours",element:<AddCours/>
    },{
        path:"/content/:idcour",element:<Content/>
    },{
        path:"/admin/Register",element:<RegisterAdmin/>    }
    ,{
        path:"/Media/:idCour",element:<Media/>    }
    ]}
])


export default router