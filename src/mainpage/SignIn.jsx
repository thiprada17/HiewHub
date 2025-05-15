import './login.css';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TOPICLOGIN from '../assets/TOPICLOGIN.png';

export default function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {

        const { name, value } = e.target;

        setUserData(prevState => ({
            ...prevState,
            [name]: value
        }));

        console.log(userData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        console.log('Data to Send:', userData);

        try {
            const response = await axios.post('http://localhost:3000/api/login', userData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log('Response from server:', response.data);
            localStorage.setItem('username', response.data.user.username);
            localStorage.setItem('user_id', response.data.user.user_id);
            localStorage.setItem('token', response.data.token);


            const authToken = localStorage.getItem('token')
            const response_2 = await axios.get('http://localhost:3000/api/users', {
                headers: {
                    'authorization': `Bearer ${authToken}`
                }
            })

            console.log('user data', response_2.data)

             navigate('/mainrunner');


        } catch (error) {
            console.error('Error sending data:', error);
            alert('Login failed. Please try again.');
        } finally {
            setLoading(false);
        }

    
    };


    return (
        <div className="body-login">
            <img src={TOPICLOGIN} alt="HiewHub Logo" className="logo-login" />
            <form className="login-box" onSubmit={handleSubmit}>
                <h2>Login ล็อกอิน</h2>
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                <button className="login-btn" type="submit" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
                <div className="divider"><span>ยังไม่มีบัญชี?</span></div>
                <a href="/signup" className="signup-link">Sign up</a>
            </form>
        </div>
    );
}
