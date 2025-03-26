import React, {
  createContext,
  useContext,
  useEffect,
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
  const {login,token}=useAuthStore()
  const {currentTenantId}=useTenantStore()
  const Login = async(email:string,password:string) => {
    try{setIsLoading(true)
      const response= await axios.post(`${API_URL}/${currentTenantId}/users/login`,{email,password})
    
      login({id:response.data.user.id,
        name:response.data.user.name,
        email:response.data.user.email,
        is_verified:response.data.user.is_verified
      },{token:response.data.access_token,tokenType:response.data.token_type}) 
      console.log('login succesful')
    }
    catch(e:any){
      console.log('There was error:',e.response.data)
      throw e
    }
    finally{setIsLoading(false)}

  };
  const Tenants = async()=>{
    try{
    const response = await axios.get(`${API_URL}/tenants`)
    console.log(response)}
    catch(e){
      console.log('There was error: ',e)
    }
  }

  const Register = async()=>{
    try{const respond = await axios.post(`${API_URL}/kibbuz/users/register`,{name:'williams',email:'kingofintelligence8@gmail.com',password:'hellothere',password_confirmation:'hellothere'})
  console.log(respond)}
  catch(e){
    console.log(e)
  }
  }
const values = {Login,Register,isLoading,Tenants}
  return (
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>
  );
};
