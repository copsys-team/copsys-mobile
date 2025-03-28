import React, {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import axios from "axios";
import { useAuthStore } from "@/hooks/stores/useAuthStore";
import { useTenantStore } from "@/hooks/stores/useTenantStore";

 const AuthContext = createContext<any>({});
export const useAuth=()=>{
return(useContext(AuthContext))
}

export const API_URL = 'https://copsys-api.erecox.com';
 

export const AuthProvider = ({ children }:any) => {
  const [isLoading,setIsLoading]=useState(false)
  const [data,setData]=useState<any>(null);
  const {login,user,token}=useAuthStore()
  const {currentTenantId}=useTenantStore()
  const Login = async(email:string,password:string) => {
    try{setIsLoading(true)
      const response= await axios.post(`${API_URL}/${currentTenantId}/users/login`,{email,password})
      console.log(JSON.stringify(response,null,2))
      login({id:response.data.user.id,
        name:response.data.user.name,
        email:response.data.user.email,
      },{token:response.data.access_token}) 
      console.log('login succesful')
      console.log(token)
      console.log(user)
    return true}
    catch(e:any){
      alert('There was a problem check your email or password 🤔')
      console.log('There was error:',e.response.data)
      throw e
    }
    finally{
       setIsLoading(false)}

  };
  


const values = {Login,isLoading}
  return (
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>
  );
};
