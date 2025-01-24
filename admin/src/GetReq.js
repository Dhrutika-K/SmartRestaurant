import Axios from "axios";

export default async function GetReq(query) {
  const token = JSON.parse(localStorage.getItem("SRA_userData")).token;
  console.log(token);
  const response = await Axios.get(query, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  
  return response.data;
}
