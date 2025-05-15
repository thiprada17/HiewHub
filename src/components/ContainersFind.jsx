import { Link } from 'react-router-dom';
import '../App.css'
import price from '../assets/price.png'
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function Containers() {
    const [posts, setPosts] = useState([]);
    console.log(posts)

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:3000/find');
                setPosts(response.data);

                console.log(setPosts)
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        fetchPosts();
    }, []);

    return (
    <>
        <div className='runner'>
        <Link className='bth bth-find' > ตามหาคนรับหิ้ว </Link>
        <Link className='bth bth-runner link-animate-button' to="/mainrunner">คนรับหิ้ว </Link>
        </div>

     
        <div className='find-container'>
            {posts.map((post) => (
                <div className='runner-card bg-slate-50 ' key={post.id}>
                    <div className='runner-info-card m-[20px] leading-[2.5rem]'>
                        <div className='runner-card-find-name text-[2rem] m-[6px]'>{post.obj_name}</div>
                        <div className='runner-card-find-location text-[1.2rem] m-[6px]'>ส่งที่ : {post.place}</div>
                        <div className='runner-card-find-date text-[1.2rem] m-[6px]'>กลับวันที่ : {post.date ? post.date.split('T')[0] : 'ไม่ระบุ'} เวลา : {post.time ? post.time.slice(0, 5): 'ไม่ระบุ'}</div>
                        <button className='runner-card-find-contact text-[1.2rem] m-[10px] h-[2.5rem] w-[25rem] bg-[#FDF288] rounded-4xl text-[#5964FF] shadow-md'
                        onClick={() => window.open(post.contact, '_blank')}   > ช่องทางติดต่อ ( click ) </button>
                    </div>
                </div>
            ))};

                    
                    
        </div> 
    </>
    );
}

