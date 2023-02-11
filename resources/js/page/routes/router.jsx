import { createBrowserRouter} from "react-router-dom";
import App from "../App";
import CardCourses from "../components/homePage/cardCourses";
import CardDev from "../components/homePage/cardDev";
import Error from "../pages/Error";



const router=createBrowserRouter([
    {
        path:'*' ,element:<Error/>
    },{
        path:'/app' ,element:<App/>
    }
    ,{
        path:'example',element:<CardCourses/>
    }
])


export default router