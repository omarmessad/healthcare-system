import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000'; 

export const login = async (email, password) => {
    try
    {
        const response = await axios.post('${API_URL}/users/login', { email, password });
        return response.data;
    }
    catch(error)
    {
        throw new Error('Invalid Credentials.');
    }
}


export const register = async (name, email, password) => {
    try
    {
        const response = await axios.post('${API_URL}/users/register', { name, email, password });
        return response.data;
    }
    catch(error)
    {
        throw new Error('Registration failed, please try again later.');
    }
}