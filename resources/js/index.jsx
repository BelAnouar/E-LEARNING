import './bootstrap';
import '../css/app.css'

import ReactDOM from 'react-dom/client';        


import { RouterProvider } from 'react-router-dom';
import router from './page/routes/router';
import { Provider } from 'react-redux';
import store from './page/store';
import Navbar from './page/components/Navbar';


ReactDOM.createRoot(document.getElementById('app')).render(     
    <Provider store={store}>
    
    <RouterProvider router={router}/></Provider>
);