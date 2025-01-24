import React,{useState} from "react";
import {BsFillBellFill,BsFillEnvelopeFill,BsPersonCircle,BsSearch,BsJustify} from "react-icons/bs"
import styles from './admin.css';
import { Link, useNavigate } from "react-router-dom";

function Header({OpenSidebar}){
    
    return(
        <header className="header">
            <div className="menu-icon" onClick={OpenSidebar}>
                <BsJustify className="icon" />
            </div>
            <div className="header-left">
                {/* <BsSearch className="icon" /> */}
            </div>
            <div className="header-right">
                {/* <BsFillBellFill className="icon"/>
                <BsFillEnvelopeFill className="icon"/> */}
                <Link to="/"><BsPersonCircle className="icon"/></Link>
            </div>
        </header>
    )
}

export default Header;