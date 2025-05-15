import './form.css';
import { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function FormRunner() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const storedUserId = localStorage.getItem('user_id');
  console.log(storedUserId)

  const [formData, setFormData] = useState({
    user_id: storedUserId,
    obj_name: '',
    place: '',
    date: '',
    time: '',
    price: '',
    price_next: '',
    contact: ''
  });


  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'datetime') {
      const [date, time] = value.split('T');
      setFormData({
        ...formData,
        date: date,
        time: time
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log('Data to Send:', formData);

    let messageDOM = document.getElementById('message');

    try {
      const response = await axios.post('http://localhost:3000/post', formData, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      console.log('Response from server:', response.data);

      messageDOM.innerText = "ประกาศรับหิ้วสำเร็จ!!\nSuccessfully!!";
      messageDOM.className = "message success";

      setTimeout(() => {
        navigate('/mainrunner');
      }, 1000);

    } catch (error) {
      console.error('Error sending data:', error);
      messageDOM.innerText = "เกิดข้อผิดพลาด!\nSomething Wrong!";
      messageDOM.className = "message danger";
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className='body runner min-h-screen w-full bg-[#F6A9C0]'>
      <Link className='back' to="/mainrunner"> กลับหน้าหลัก</Link>
      <div className="box runner">
        <div className="header">ประกาศรับหิ้ว</div>

        <div className="box-form runner flex justify-center flex-wrap">
          <form onSubmit={handleSubmit}>
            <div className="form">
              <div className="topic-form">รับหิ้ว...ที่... ( ระบุชื่อสินค้า และ สถานที่ )</div>
              <input
                name="obj_name"
                value={formData.obj_name}
                className="fill-from text-stone-950"
                type="text"
                placeholder="ตามหา...ที่..."
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex gap-4 flex-col md:flex-row">
              <div className="form flex-1">
                <div className="topic-form">สถานที่ส่ง</div>
                <input
                  name="place"
                  value={formData.place}
                  className="fill-from text-stone-950"
                  type="text"
                  placeholder="จัดส่งที่..."
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form flex-1">
                <div className="topic-form">วัน-เวลา ที่ต้องการรับ</div>
                <input
                  name="datetime"
                  value={formData.datetime}
                  className="fill-from text-stone-500"
                  type="datetime-local"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="flex gap-4 flex-col md:flex-row">
              <div className="form flex-1">
                <div className="topic-form">ราคาชิ้นแรก</div>
                <input
                  name="price"
                  value={formData.price}
                  className="fill-from text-stone-950"
                  type="number"
                  placeholder="00"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form flex-1">
                <div className="topic-form">ชิ้นต่อไป +</div>
                <input
                  name="price_next"
                  value={formData.price_next}
                  className="fill-from text-stone-950"
                  type="number"
                  placeholder="00"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form flex-1">
              <div className="topic-form">Contact (URL ไลน์)</div>
              <input
                name="contact"
                value={formData.contact}
                className="fill-from text-stone-950"
                type="url"
                placeholder="url..."
                onChange={handleChange}
                required
              />
            </div>

            <div id='message' className='message'>hello</div>

            <div className="form" style={{ textAlign: 'center' }}>
              <button className="submit-btn runner" type='submit'>
                SUBMIT
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
