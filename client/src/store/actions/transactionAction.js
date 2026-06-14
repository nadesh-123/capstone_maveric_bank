import axios from "axios"
import { useSelector } from "react-redux";
 
export const storeTransaction=(token)=>{
   
    return async (dispatch, getState)=>{
        const token = getState().user.token;
        const response= await axios.get("http://localhost:8080/api/transaction/get-transactions?page=0",{
      headers:{
       'Authorization': `Bearer ${token}`
      }
    })
    console.log(response.data)
    let action={
        type:'STORE_TRANSACTIONS',
        payload:response.data
    }
    console.log("action called")
    console.log("from action",token)
    dispatch(action)
    }
}