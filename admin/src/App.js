import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import './index.css';

import React, { useState } from 'react';
import AuthComponent from "./login/login";
import LoginForm from "./login/signin";

import Admin from "./admin/admin"

import Product from "./admin/products";
import Sidebar from "./admin/sidebar";
import Header from "./admin/header";
import Customers from "./admin/customers";
import Ratings from "./admin/ratings";

function App() {

 //const location = useLocation();
  
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
  
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

   return (
     <div className="App">
         <Routes>
           <Route path="/" element={<LoginForm />} />
           <Route path="/login" element={<AuthComponent />} />
           <Route path="/admin" element={<Admin openSidebarToggle={!openSidebarToggle} OpenSidebar={OpenSidebar} />}/>
           <Route path="/products" element={<Product openSidebarToggle={!openSidebarToggle} OpenSidebar={OpenSidebar}/>} />
            <Route path="/customers" element={<Customers openSidebarToggle={!openSidebarToggle} OpenSidebar={OpenSidebar}/>} />
            <Route path="/ratings" element={<Ratings openSidebarToggle={!openSidebarToggle} OpenSidebar={OpenSidebar}/>} />
         </Routes>
       
   </div>
   );
 
};
export default App;


