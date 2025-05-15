import './login.css';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TOPICLOGIN from '../assets/TOPICLOGIN.png';

export default function SignUp() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [userData, setUserData] = useState({
        username : '',
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

        let messageDOM = document.getElementById('message');

        try {
            const response = await axios.post('http://localhost:3000/api/register', userData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log('Response from server:', response.data);
            localStorage.setItem('username', response.data.username);


            messageDOM.innerText = "ลงทะเบียนสำเร็จ!!\nSuccessfully!!";
            messageDOM.className = "message success";

            setTimeout(() => {
                navigate('/signin');
            }, 800);


        } catch (error) {
            console.error('Error sending data:', error);
            alert('Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="body-login">
            <form className="login-box" onSubmit={handleSubmit}>
                <h2>Sign up ลงทะเบียน</h2>
                <input type="text" name="username" placeholder="Username" value={userData.username}  className='username' onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" value={userData.email} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" value={userData.passsword} onChange={handleChange} required />
               
               <div id = 'message' className='message'>hello</div>
               
                <button className="login-btn" type="submit">
                    {loading ? 'Logging in...' : 'Sign Up'}
                </button>

            </form>
        </div>
    );
}
