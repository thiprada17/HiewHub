import React from 'react';
import gif from '../assets/decor-gif.gif'
import '../App.css'

export default function Topics() {
  return (
     <div className="topic">
        <div className="img grid place-content-center h-80">
          <img src={gif} alt="" />
        </div>
      </div>
          
  );
}