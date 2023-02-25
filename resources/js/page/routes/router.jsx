import { createBrowserRouter} from "react-router-dom";

import Error from "../components/Error"
import Books from "../pages/Books";
import Courses from "../pages/coursesPage";
import Home from "../pages/homePage";
import Lesson from "../pages/leson";
import Programs from "../pages/Program&Degrees";
import Register from "../pages/Register";
import SignIn from "../pages/signin";


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
        path:"/lesson",element:<Lesson/>
    }
])


export default router