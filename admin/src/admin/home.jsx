import React,{ useEffect,useState} from "react";
import GetReq from "../GetReq";
import 
{ BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill,BsCash}
 from 'react-icons/bs'
 import 
 { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } 
 from 'recharts';
 import axios from "axios";
 import Config from "../config";

 
function Home() {

    const [productCount, setProductCount] = useState(0);
    const [cusineCount,setCusineCount]=useState(0);
    const [customerCount, setCustomerCount] = useState(0);
    const[menu,setMenu]=useState([]);
    const [income, setIncome] = useState(0);

    const [apiURL, setAPIURL] = useState(
      `${Config.API_BASE_URL}menuItems`
      );
    
    
      useEffect(() => {
        console.log("menu");
        
        GetReq(apiURL).then((res) => {
          setMenu(res);
          setProductCount(res.length);
          const cusines=[...new Set(res.map((item) => item.cuisine))];
          setCusineCount(cusines.length);
          console.log(res.length);
          console.log(cusines.length);
        });
        console.log("customer");
        const customersAPIURL =  `${Config.API_BASE_URL}users/customers`;
        GetReq(customersAPIURL).then((res) => {
          setCustomerCount(res.length);
          console.log(res.length);
          
        });
        
        const incomeAPIURL =  `${Config.API_BASE_URL}orders/calculateTotalForDay`; // Replace with the actual API URL
        GetReq(incomeAPIURL).then((res) => {
          setIncome(res.amount);
          console.log(res.startdate);
          console.log(res.enddate);
          console.log(res.amount);
          console.log(res.list);
          
          
        });


      }, [apiURL]);
     

  return (
    <main className='main-container'>
        <div className='main-title'>
            <h3>DASHBOARD</h3>
        </div>

        <div className='main-cards'>
            <div className='card'>
                <div className='card-inner'>
                    <h3>DISHES</h3>
                    <BsFillArchiveFill className='card_icon'/>
                </div>
                <h1>{productCount}</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>CUSINES</h3>
                    <BsFillGrid3X3GapFill className='card_icon'/>
                </div>
                <h1>{cusineCount}</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>CUSTOMERS</h3>
                    <BsPeopleFill className='card_icon'/>
                </div>
              <h1>{customerCount}</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>DAILY INCOME</h3>
                    <BsCash className='card_icon'/>
                </div>
                <h1>{income}</h1>
            </div>
        </div>

        
    </main>
  )
}

export default Home