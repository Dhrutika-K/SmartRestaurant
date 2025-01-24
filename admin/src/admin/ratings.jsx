import React, { useEffect, useState } from "react";
import Axios from "axios";
import Sidebar from "./sidebar";
import Header from "./header";
import styles from "./admin.css";
import Config from "../config";
// import Review from "./review";
// import GetReq from "../GetReq";

function Ratings({ openSidebarToggle, OpenSidebar }) {
  const [menuRatings, setMenuRating] = useState([]);
  const [error, setError] = useState(null);
  const [apiURL, setAPIURL] = useState( `${Config.API_BASE_URL}rating/review`);

  const fetchMenuDetails = async (menuId) => {
    //console.log(menuId);
    const token = JSON.parse(localStorage.getItem("SRA_userData")).token;
    //console.log(token);
    try {
      const response = await Axios.get( `${Config.API_BASE_URL}menuItems/${menuId}`,{headers: {
        'Authorization': `Bearer ${token}` // Assuming a Bearer token
      }});
      //console.log(response.data.menuName);
      return response.data.menuName; // Assuming the API returns menu item name
    } catch (error) {
      // Handle any errors or set a default value
      console.log("Menu Name Not Found" )
      //return { name: "Menu Name Not Found" };
    }
  };

  useEffect(() => {
    // Retrieve the token from local storage
    const token = JSON.parse(localStorage.getItem("SRA_userData")).token;
    //console.log("called");
    //console.log(token);
    // Configure Axios with the token in the request headers
    Axios.get(apiURL, {
      headers: {
        'Authorization': `Bearer ${token}` // Assuming a Bearer token
      }
    })
      .then(async (res) => {
        const menuRatingsWithNames = await Promise.all(
          res.data.map(async (menuRating) => {
            const menuDetails = await fetchMenuDetails(menuRating.menuId);
            //console.log(menuDetails.name);
            //console.log(menuRating);
            console.log(menuDetails);
            menuRating.menuName=menuDetails;
            return menuRating;
          })
        );
        setMenuRating(menuRatingsWithNames);
      })
      .catch((error) => {
        setError("Error fetching data");
      });
  }, [apiURL]);

  //console.log("menuRating", menuRatings); // Debugging: Log menuRating
  //console.log("menuName", menuDetails.name);

  return (
    <div className="grid-container">
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
      <h3 className="heading" >Reviews</h3>
      <ul className="menu-container margin" >
        {menuRatings.map((menuRating) => (
          <li key={menuRating.menuId} className="menu-cards">
            <div className="item">
              <p>Menu Name: {menuRating.menuName}</p>
              <p>Review: {menuRating.review}</p>
              <p>Number of Ratings: {menuRating.rating}</p>
            </div>
            
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Ratings;


