import React from 'react';
import  { Link } from 'react-router-dom';
import '../App.css'


export default function Buttons() {
    return (
        <div className='button'>
            <Link to='/formrunner' >
                <button className='bth-form runner link-animate-button'>ประกาศรับหิ้ว</button>
            </Link>
            
            <Link to='/formfind'>
                <button className='bth-form find link-animate-button'>ตามหาคนหิ้ว</button>
            </Link>
        
        
        </div>

    );
}