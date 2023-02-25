import './bootstrap';
import '../css/app.css'

import ReactDOM from 'react-dom/client';        


import { RouterProvider } from 'react-router-dom';
import router from './page/routes/router';


ReactDOM.createRoot(document.getElementById('app')).render(     
    <RouterProvider router={router}/>
);