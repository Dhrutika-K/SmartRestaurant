
import React, { useState, useEffect } from "react";
import Axios from "axios";
import Header from "./header";
import Sidebar from "./sidebar";
import Home from "./home";

import styles from './admin.css';

//import Sidebar from "./sidebar";

function App({openSidebarToggle,OpenSidebar}) {
    
  
    return (
      <div className='grid-container'>
        <Header OpenSidebar={OpenSidebar}/>
        <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
        <Home />
      </div>
    )
}

export default App;

