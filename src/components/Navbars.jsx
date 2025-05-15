import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';
import person from '../assets/person.png';

export default function Navbars() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="navbar shadow-sm bg-slate-50">
      <div className="navbar-start">
        <div className="dropdown bg-slate-50">
          <div tabIndex={0} role="button" className="btn btn-circle bg-slate-50">
            <img src={person} alt="User Icon" />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-slate-50 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li><Link className="navbar-link" to="/postrunner">โพสต์ของคุณ</Link></li>
            <li><button className="navbar-link" onClick={handleLogout}>ออกจากระบบ</button></li>
            <li><Link className="navbar-link" to="/aboutus">About us</Link></li>
          </ul>
        </div>
        <h3 className="username-navbars" id="username-navbars">
          {username || 'Guest'}
        </h3>
      </div>
      <div className="navbar-center">
        <a className="logo text-xl">HiewHub</a>
      </div>
      <div className="navbar-end"></div>
    </div>
  );
}
