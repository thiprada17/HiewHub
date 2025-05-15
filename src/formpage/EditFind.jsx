import './edit.css';
import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import person from '../assets/person.png'

export default function EditFind() {
    const location = useLocation();
    const { id } = location.state || {};
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState('');

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    const [formData, setFormData] = useState({
        obj_name: '',
        place: '',
        date: '',
        time: '',
        contact: ''
    });


    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'datetime') {
            const [date, time] = value.split('T');
            setFormData({ ...formData, date, time });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        let messageDOM = document.getElementById('message');
        console.log(formData)

        try {
            const response = await axios.put(`http://localhost:3000/find/${id}`, formData);
            console.log('Updated:', response.data);

            messageDOM.innerText = "แก้ไขโพสต์สำเร็จ!!";
            messageDOM.className = "message success";

            setTimeout(() => {
                navigate('/mainfind');
            }, 1000);
        } catch (error) {
            console.error('Error:', error);
            messageDOM.innerText = "เกิดข้อผิดพลาด!";
            messageDOM.className = "message danger";
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="body-edit runner min-h-screen w-full bg-[#F6A9C0]">
            <div className="topbar h-[80px]">

                <div className="user-info-edit ml-[10px]">
                    <img src={person} className="person-edit" alt="" />
                    <h3 className='username-navbars' id='username-navbars'>
                        {username ? username : 'Guest'}
                    </h3>
                </div>
                <Link className="back-edit" to="/mainrunner">กลับหน้าหลัก</Link>
            </div>




            <div className="box-edit">
                <div className="box-2-edit mt-[5px]">
                    <form onSubmit={handleSubmit}>
                        <div className="form-edit">
                            <div className="topic-form-edit text-stone-950">รับหิ้ว... ( ระบุชื่อสินค้าและสถานที่ )</div>
                            <input
                                name="obj_name"
                                value={formData.obj_name}
                                className="rubhiew-from-edit text-stone-950"
                                type="text"
                                placeholder="รับหิ้ว.........ที่........."
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-edit">
                            <div className="topic-form-edit text-stone-950">สถานที่ส่ง</div>
                            <input
                                name="place"
                                value={formData.place}
                                className="rubhiew-from-edit  text-stone-950"
                                type="text"
                                placeholder="จัดส่งที่...."
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-edit row">
                            <div className="col">
                                <div className="topic-form-edit text-stone-950">วัน-เวลา</div>
                                <input
                                    name="datetime"
                                    value={formData.datetime}
                                    className="rubhiew-from-edit text-stone-500"
                                    type="datetime-local"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="col">
                                <div className="topic-form-edit text-stone-950">Contact</div>
                                <input
                                    name="contact"
                                    value={formData.contact}
                                    className="rubhiew-from-edit text-stone-950"
                                    type="url"
                                    placeholder="url..."
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>


                        <div id="message" className="message">hello</div>

                        <div className="form-edit" style={{ textAlign: "center" }}>
                            <button className="submit-btn-edit" type="submit">SUBMIT</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
}
