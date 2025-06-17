import axios from "axios";
import { consts } from "../utils";

export const loginUser = async (Credentials:any) => {
    try{
        const response = await axios.post(`${consts.BACKEND_ENPOINT}/users/login`, Credentials);

        return response.data;

    }catch(error){
        console.error('Login error:', error);
        throw error;  
    }    
}


export const registerUser = async (formData:any) => {
    try{
        const response = await axios.post(`${consts.BACKEND_ENPOINT}/users/register`, formData);

        return response;

    }
    catch(error){
        console.log('register error:',error )
        throw error;
    }
}