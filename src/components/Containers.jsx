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
                const response = await axios.get('http://localhost:3000/post');
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
                <Link className='bth bth-find link-animate-button' to="/mainfind"> ตามหาคนรับหิ้ว </Link>
                <a href='' className='bth bth-runner '>คนรับหิ้ว </a>
            </div>

            <div className='runner-container w-auto'>
                {posts.map((post) => (
                    
                    <div className='runner-card' key={post.id}>
                        <div className='runner-info-card m-[20px] leading-[2.5rem]'>
                            <div className='runner-card-find-name text-[2rem] m-[6px]'>{post.obj_name}</div>
                            <div className='runner-card-find-location text-[1.2rem] m-[6px]'>ส่งที่ : {post.place}</div>
                            <div className='runner-card-find-date text-[1.2rem] m-[6px]'>กลับวันที่ : {post.date ? post.date.split('T')[0] : 'ไม่ระบุ'} เวลา : {post.date ? post.time.slice(0, 5): 'ไม่ระบุ'} </div>
                            <button className='runner-card-find-contact text-[1.2rem] m-[10px] h-[2.5rem] w-[25rem] bg-[#FDF288] rounded-4xl text-[#5964FF] shadow-md'
                            onClick={() => window.open(post.contact, '_blank')} > ช่องทางติดต่อ ( click ) </button>
                            <div className='runner-card-find-price right-0 gap-[10px] block'>
                                <div className='priceper'>
                                    <div className='price-topic'> ราคาต่อชิ้น</div>
                                    <div className='runner-card-find-price-start text-[1.5rem] w-[7rem] h-[4rem] border-[1px] rounded-xl flex items-center justify-center'>
                                        {post.price}
                                    </div>
                                </div>
                                <div className='priceper'>
                                    <div className='price-topic'>ชิ้นต่อไป +</div>
                                    <div className='runner-card-find-price-next text-[1.5rem] w-[5rem] h-[4rem] border-[1px] rounded-xl flex items-center justify-center'>
                                        {post.price_next}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                ))};

                <div></div>

            </div>
        </>
    );
}