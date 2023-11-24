import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./App.css"
function App() {
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/v1/users?searchText=${searchText}`);
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [searchText]);

  return (
    <div>
      <input className='input'
        type="text"
        placeholder="Search by name"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      <table className='table'> 
        <thead>
          <tr className='tr'>
            <th className='th '>Name</th>
            <th className='th '>Email</th>
            <th className='th '>Posts</th>
          </tr>
        </thead>
        <tbody className='body'>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                {user.posts.map((post) => (
                  <div key={post.id}>{post.title}</div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
