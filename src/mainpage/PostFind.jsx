import { Link } from 'react-router-dom';
import '../App.css'
import price from '../assets/price.png'
import axios from 'axios';
import { useState, useEffect } from 'react';
import person from '../assets/person.png'

export default function PostRunner() {
    const [posts, setPosts] = useState([]);
    console.log(posts)
    const [username, setUsername] = useState('');

    const user_id = localStorage.getItem('user_id')

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/find/${user_id}`);
                setPosts(response.data);

                console.log(setPosts)
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        fetchPosts();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('คุณแน่ใจว่าต้องการลบโพสต์นี้?')) {
            try {
                await axios.delete(`http://localhost:3000/find/${id}`);
                setPosts(posts.filter(post => post.id !== postId));
            } catch (error) {
                console.error('Error deleting post:', error);
            }
        }
    };

    return (
        <>
            <div className='runner'>
                <div className="topbar h-[80px] mb-[50px]">
                    <div className="user-info-edit ml-[10px]">
                        <img src={person} className="person-edit" alt="" />
                        <h3 className='username-navbars' id='username-navbars'>
                            {username ? username : 'Guest'}
                        </h3>
                    </div>
                    <Link className="back-edit" to="/mainrunner">กลับหน้าหลัก</Link>
                </div>

                <div className='topic-post'>your post!!</div>
                <Link className='bth bth-find' > โพสต์ตามหา </Link>
                <Link className='bth bth-runner link-animate-button' to="/postrunner">โพสต์รับหิ้ว </Link>
            </div>


            <div className='find-container'>
                {posts.map((post) => (
                    <div className='runner-card post bg-slate-50 ' key={post.id}>
                        <div className='runner-info-card m-[20px] leading-[2.5rem]'>
                            <div className='runner-card-find-name text-[2rem] m-[6px]'>{post.obj_name}</div>
                            <div className='runner-card-find-location text-[1.2rem] m-[6px]'>ส่งที่ : {post.place}</div>
                            <div className='runner-card-find-date text-[1.2rem] m-[6px]'>กลับวันที่ : {post.date ? post.date.split('T')[0] : 'ไม่ระบุ'} เวลา : {post.time ? post.time.slice(0, 5) : 'ไม่ระบุ'}</div>
                            <div className='runner-card-find-price right-0 gap-[10px] block'>
                                <div className='priceper'>
                                    <div className='runner-card-find-price-star bg-orange-100 text-[1.5rem] w-[7rem] h-[4rem] border-[1px] rounded-xl flex items-center justify-center'>
                                        <Link to="/editfind" state={{ id: post.id }} >แก้ไข</Link>
                                    </div>
                                </div>
                                <div className='priceper'>
                                    <button onClick={() => handleDelete(post.id)} className='runner-card-find-price-next bg-rose-400 text-[1.5rem] w-[5rem] h-[4rem] border-[1px] rounded-xl flex items-center justify-center'>
                                        ลบ
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))};



            </div>
        </>
    );
}

