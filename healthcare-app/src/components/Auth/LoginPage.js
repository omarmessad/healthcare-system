import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import '../../styles/LoginPage.css';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try
        {
            const response = await axios.post('/users/login', { email, password });
            Cookies.set('authToken', response.data.token);

            switch(response.data.role)
            {
                case 'Patient':
                window.location.href = '/patient/dashboard';
                break;
                case 'Doctor':
                window.location.href = '/doctor/dashboard';
                break;
                case 'FinanceUser':
                window.location.href = '/finance/dashboard';
                break;
                default:
                window.location.href = '/';
            }
        }
        catch(error)
        {
            console.error('Login failed: ', error);
        }
    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Login</button>
            </form>
        </div>
    );
    
};



export default Login;