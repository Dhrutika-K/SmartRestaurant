import React,{ useEffect,useState} from "react";
import GetReq from "../GetReq";
import styles from './admin.css';
import Sidebar from "./sidebar";
import Header from "./header";
import Axios from "axios";
import { BsFillTrashFill, BsFillPencilFill} from "react-icons/bs";
import Config from "../config";



function Product({openSidebarToggle,OpenSidebar}) {
    const[data,setData]=useState([]);
    const[error,setError]=useState(null);
    const [apiURL, setAPIURL] = useState(
        `${Config.API_BASE_URL}menuItems/?`
    );
    const [showForm1, setShowForm1] = useState(false);
    const [showForm2, setShowForm2] = useState(false);
    const[menuID,setmenuID]=useState("");
    const [formData, setFormData] = useState({
    name: "",
    price: 0,
    description: "",
    preparationTime: 0,
    cuisine: "",
    spicinessLevel: 0,
    isVeg: false,
    calories: 0,
    availability: false,
    imageURL:"",
    });
    
    useEffect(() => {
    // console.log("called");
    GetReq(apiURL).then((res) => {
        setData(res);
    });
    }, [apiURL]);

    
    const handleAdd = () => {
        setShowForm1(true);
        console.log(showForm1);
    };

    const handleUpdate = (item) => {
        setShowForm2(true);
        setmenuID(item._id); // Set menuID based on the selected item's _id
        setFormData({
            name: item.name,
            price: item.price,
            description: item.description,
            preparationTime: item.preparationTime,
            cuisine: item.cuisine,
            spicinessLevel: item.spicinessLevel,
            isVeg: item.isVeg,
            calories: item.calories,
            availability: item.availability,
            imageURL:item.imageURL,
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
    }; 

    const handleUpdateSubmit = async (e) => {
        console.log(menuID);
        //e.preventDefault();
        setShowForm2(false);
        try {
            const token = JSON.parse(localStorage.getItem("SRA_userData")).token;
            console.log(formData);
            console.log(token);
            console.log(JSON.parse(localStorage.getItem("SRA_userData")).role);
  
            if (!token) {
                // Handle case where the user is not authenticated
                setError("Authentication required.");
                return;
            }
  
            
            // Include the token in the request headers
            const headers = {
                authorization:` Bearer ${token}`,
            };
  
            // Send a POST request with the token in the headers
            const response = await Axios.patch(
                `${Config.API_BASE_URL}menuItems/${menuID}`,
                formData,
                { headers }
            );
            // Handle successful response (e.g., show a success message or redirect)
            console.log("Menu item added successfully:", response.data);
            alert("Menu item updated successfully");
            
          } catch (error) {
            if (error.response) {
              if (error.response.status === 400) {
                setError("Forbidden. You do not have permission to perform this action.");
                alert("Forbidden. You do not have permission to perform this action.");
              } else {
                setError("An error occurred while adding the menu item.");
                alert("An error occurred while adding the menu item.");
              }
            } else if (error.request) {
              setError("Network error. Please check your internet connection.");
              //alert(error);
            } else {
              setError("An error occurred. Please try again later.");
              //alert(error);
            }
            
          }
          
      };

      const handleDeleteSubmit=async (menuId) => {
        //setShowForm3(false);
        try {
            const token = JSON.parse(localStorage.getItem("SRA_userData")).token;
            //console.log(delID);
            console.log(token);
            //console.log(token.role);
  
            if (!token) {
                // Handle case where the user is not authenticated
                setError("Authentication required.");
                return;
            }
  
            
            // Include the token in the request headers
            const headers = {
                authorization:` Bearer ${token}`,
            };
  
            const response = await Axios.delete(
                `${Config.API_BASE_URL}menuItems/${menuId}`, // Use the appropriate URL with the menu item ID
              { headers }
            );
      
            console.log("Menu item deleted successfully:", response.data);
            alert("Menu item deleted successfully");
            
          } catch (error) {
                console.log(error);
          }
      };

    const handleAddSubmit = async (e) => {
        // console.log(formData);
        //e.preventDefault();
        setShowForm1(false);
        try {
            const token = JSON.parse(localStorage.getItem("SRA_userData")).token;
            console.log(formData);
            //console.log(token);
            //console.log(token.role);
  
            if (!token) {
                // Handle case where the user is not authenticated
                setError("Authentication required.");
                return;
            }
  
            
            // Include the token in the request headers
            const headers = {
                authorization:` Bearer ${token}`,
            };
  
            // Send a POST request with the token in the headers
            const response = await Axios.post(
                `${Config.API_BASE_URL}menuItems`,
                formData,
                { headers }
            );
            // Handle successful response (e.g., show a success message or redirect)
            console.log("Menu item added successfully:", response.data);
            alert("Menu item added successfully");
            
          } catch (error) {
            if (error.response) {
              if (error.response.status === 400) {
                setError("Forbidden. You do not have permission to perform this action.");
                alert("Forbidden. You do not have permission to perform this action.");
              } else {
                setError("An error occurred while adding the menu item.");
                alert("An error occurred while adding the menu item.");
              }
            } else if (error.request) {
              setError("Network error. Please check your internet connection.");
              //alert(error);
            } else {
              setError("An error occurred. Please try again later.");
              //alert(error);
            }
            
          }
          
      };

    return(
        <div className="grid-container">
            <Header OpenSidebar={OpenSidebar}/> 
            <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
            <h3 className="heading">Menu Items</h3>
            <div className="c1">
                <div className="bttn">
                    <button onClick={handleAdd} className="c2"> Add DISH</button>
                </div>
            
            {showForm1 && (
                <div  className="form-container">
        
                    <div className="form-label">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-label">
                        <label htmlFor="price">Price</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                            step="0.01" 
                        />
                    </div>
                    <div className="form-label">
                        <label htmlFor="imageURL">URL</label>
                        <input
                            type="text"
                            id="imageURL"
                            name="imageURL"
                            value={formData.imageURL}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-label">
                        <label htmlFor="description">Description</label>
                        <input
                            type="text"
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required 
                        />
                    </div>
                    <div className="form-label">
                        <label htmlFor="preparationTime">preparationTime</label>
                        <input
                            type="number"
                            id="preparationTime"
                            name="preparationTime"
                            value={formData.preparationTime}
                            onChange={handleChange}
                            required 
                        />
                    </div>
                    <div className="form-label">
                        <label htmlFor="cuisine">cusine</label>
                        <input
                            type="text"
                            id="cuisine"
                            name="cuisine"
                            value={formData.cuisine}
                            onChange={handleChange}
                            required 
                        />
                    </div>
                    <div className="form-label">
                        <label htmlFor="spicinessLevel">spicinessLevel</label>
                        <input
                            type="number"
                            min={0}
                            max={3}
                            defaultValue={0}
                            id="spicinessLevel"
                            name="spicinessLevel"
                            value={formData.spicinessLevel}
                            onChange={handleChange}
                            required 
                        />
                    </div>
                    <div className="form-label">
                        <label htmlFor="isVeg">IsVeg</label>
                        <input
                        type="checkbox"
                        id="isVeg"
                        name="isVeg"
                        //checked={formData.isVeg} // Use "checked" attribute
                        // value="true"
                        onChange={(e) => {
                            setFormData({
                            ...formData,
                            isVeg: e.target.checked, // Toggle "isVeg" based on checkbox state
                            });
                        }}
                        //required
                        />
                    </div>
                    <div className="form-label">
                        <label htmlFor="calories">calories</label>
                        <input
                            type="number"
                            id="calories"
                            name="calories"
                            value={formData.calories}
                            onChange={handleChange}
                            required 
                        />
                    </div>
                    <div className="form-label">
                        <label htmlFor="availability">availability</label>
                        <input
                            type="checkbox"
                            id="availability"
                            name="availability"
                            //value={formData.availability}
                            onChange={(e) => {
                            setFormData({
                            ...formData,
                            availability: e.target.checked, // Toggle "isVeg" based on checkbox state
                            });
                        }}
                            //required 
                        />
                    </div>
                    <button onClick={handleAddSubmit}>Submit</button>
                </div>

            )}
            {showForm2 && (
                <div  className="form-container">
        
                    <div className="form-label">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-label">
                        <label htmlFor="price">Price</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                            step="0.01" 
                        />
                    </div>
                    <div className="form-label">
                        <label htmlFor="imageURL">URL</label>
                        <input
                            type="text"
                            id="imageURL"
                            name="imageURL"
                            value={formData.imageURL}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-label">
                        <label htmlFor="description">Description</label>
                        <input
                            type="text"
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required 
                        />
                    </div>
                    <div className="form-label">
                        <label htmlFor="preparationTime">preparationTime</label>
                        <input
                            type="number"
                            id="preparationTime"
                            name="preparationTime"
                            value={formData.preparationTime}
                            onChange={handleChange}
                            required 
                        />
                    </div>
                    <div className="form-label">
                        <label htmlFor="cuisine">cusine</label>
                        <input
                            type="text"
                            id="cuisine"
                            name="cuisine"
                            value={formData.cuisine}
                            onChange={handleChange}
                            required 
                        />
                    </div>
                    <div className="form-label">
                        <label htmlFor="spicinessLevel">spicinessLevel</label>
                        <input
                            type="number"
                            min={0}
                            max={3}
                            defaultValue={0}
                            id="spicinessLevel"
                            name="spicinessLevel"
                            value={formData.spicinessLevel}
                            onChange={handleChange}
                            required 
                        />
                    </div>
                    <div className="form-label">
                        <label htmlFor="isVeg">IsVeg</label>
                        <input
                        type="checkbox"
                        id="isVeg"
                        name="isVeg"
                        //checked={formData.isVeg} // Use "checked" attribute
                        value={formData.isVeg}
                        onChange={(e) => {
                            setFormData({
                            ...formData,
                            isVeg: e.target.checked, // Toggle "isVeg" based on checkbox state
                            });
                        }}
                        required
                        />
                    </div>
                    <div className="form-label">
                        <label htmlFor="calories">calories</label>
                        <input
                            type="number"
                            id="calories"
                            name="calories"
                            value={formData.calories}
                            onChange={handleChange}
                            required 
                        />
                    </div>
                    <div className="form-label">
                        <label htmlFor="availability">availability</label>
                        <input
                            type="checkbox"
                            id="availability"
                            name="availability"
                            value={formData.availability}
                            onChange={(e) => {
                                setFormData({
                                ...formData,
                                availability: e.target.checked, // Toggle "isVeg" based on checkbox state
                                });
                            }}
                            required 
                        />
                    </div>
                    <button onClick={handleUpdateSubmit}>Submit</button>
                </div>

            )}

            <ul className="menu-container">
                {data.map((item)=>(
                    <li key={item._id} className="menu-cards">
                        <div className="item">
                            
                            <div className="header">
                                <div style={{display:"flex",justifyContent:"flex-start"}}>
                                    {item.isVeg?<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Veg_symbol.svg/1200px-Veg_symbol.svg.png" style={{width:"25px",height:"25px"}}/>:<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQneZhjICvjRknryP8LaEKB-59GoIXNu-o1fk6qANxUJPFf6R0kSe6iPIUnVWQRv2qNb9Y&usqp=CAU" style={{width:"20px",height:"20px"}}/>}
                                    <b className="title">{item.name}</b>
                                </div>
                                <div className="header-right">
                                    <button style={{ background: 'none' }} onClick={() => handleDeleteSubmit(item._id)}><BsFillTrashFill className="icon"/></button>
                                    <button style={{ background: 'none', marginLeft: '-95px' }} onClick={() => handleUpdate(item)}><BsFillPencilFill className="icon"/></button>
                                </div>
                            </div>
                            <p>Rs.{item.price}</p>
                            <p>{item.cuisine}</p>
                            <p>DESCRIPTION:{item.description}</p>
                            <img src={item.imageURL} alt={item.name} style={{ width:"200px", height:"200px"}} />
                        </div>
                    </li>
                    
                ))}
            </ul>
            </div>
        </div>
    )
}

export default Product;