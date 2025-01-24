import React,{ useEffect,useState} from "react";
import GetReq from "../GetReq";
import Sidebar from "./sidebar";
import Header from "./header";
import styles from './admin.css';
import Axios from "axios";
import Config from "../config";

function Customers({openSidebarToggle,OpenSidebar}){
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);

  useEffect(() => {
    // Define the API endpoint for the POST requests
    const apiEndpoint =  `${Config.API_BASE_URL}users/customers`; // Replace with your API URL

    Axios.get(apiEndpoint)
      .then((response) => {
        // Assuming the API response contains an array of posts
        const { data } = response;
        setPosts(data);
      })
      .catch((err) => {
        setError("Error fetching data from the API");
        console.error("Error fetching data:", err);
      });
  }, []);
    return(
        <div className="grid-container">
            <Header OpenSidebar={OpenSidebar}/> 
            <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
            <h3 className="heading">Customers</h3>
            <ul className="menu-container">
                {posts.map((post) => (
                <li key={post.id} className="menu-cards">
                    <div className="item">
                        <p className="customer-name">{post.firstName} {post.lastName}</p>
                        <p className="customer-email"> {post.email}</p>
                    </div>
                </li>
                ))}
            </ul>
        </div>
    )
    
}


export default Customers;