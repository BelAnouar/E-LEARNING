import './bootstrap';
import '../css/app.css'

import ReactDOM from 'react-dom/client';        


import { RouterProvider } from 'react-router-dom';
import router from './page/routes/router';

import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css';
import { ContextProvider } from './page/pages/contexts/contextProvider';
import { QueryClient, QueryClientProvider } from 'react-query'



const queryClient=new QueryClient()
ReactDOM.createRoot(document.getElementById('app')).render( 
  
    <QueryClientProvider client={queryClient}>
   <ContextProvider> 
    
    <RouterProvider router={router}/>
    <ToastContainer limit={1}/>
    </ContextProvider>
    </QueryClientProvider>  
);