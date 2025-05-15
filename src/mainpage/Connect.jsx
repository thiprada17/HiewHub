import React, { useEffect, useState } from 'react';
import axios from 'axios'; // ใช้งาน axios จาก npm

export default function Connect() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then((response) => {
        console.log('responseData', response.data);
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, []);

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map((user, index) => (
          <li key={index}>{JSON.stringify(user)}</li>
        ))}
      </ul>
    </div>
  );
}
