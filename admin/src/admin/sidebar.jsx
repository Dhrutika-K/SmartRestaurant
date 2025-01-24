import React from "react";
import { BsCart3, BsGrid1X2Fill, BsFillGrid3X3GapFill, BsPeopleFill, 
    BsListCheck, BsMenuButtonWideFill, BsFillGearFill } from "react-icons/bs";
import Product from "./products";
import { Link, useNavigate } from "react-router-dom";
import styles from './admin.css';


function Sidebar({openSidebarToggle, OpenSidebar}) {
    // console.log(openSidebarToggle);
    return(
        <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
            <div className="sidebar-title">
                {/* <div className="sidebar-brand">
                    <BsCart3 className="icon"/>SHOP
                </div> */}
                <span className='icon close_icon' onClick={OpenSidebar}>X</span>
            </div>
            <ul className="sidebar-list">
                <li className="sidebar-list-item">
                    <BsGrid1X2Fill className="icon" />
                    <Link to="/admin">DashBoard</Link>    
                </li>
                <li className="sidebar-list-item">
                    <BsPeopleFill className="icon" />
                    {/* <a href="">Customers</a>     */}
                    <Link to="/customers">Customers</Link>  
                </li>
                <li className="sidebar-list-item">
                    <BsMenuButtonWideFill className="icon" />
                    <Link to="/ratings">Reviews</Link>    
                </li>
                <li className="sidebar-list-item">
                    <BsFillGearFill className="icon" />
                    <a href="">Settings</a>    
                </li>
                <li className="sidebar-list-item">
                    <BsCart3 className="icon" />
                    <Link to="/products">MenuItems</Link>    
                </li>
                <li className="sidebar-list-item">
                    <BsListCheck className="icon" />
                    <Link to="/login">Staff</Link>    
                </li>
            </ul>
        </aside>
    )
}

export default Sidebar;