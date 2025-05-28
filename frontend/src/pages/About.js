import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import EditProduct from '../components/AdminView';
import AddProductPage from '../components/AddProduct';


function About() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const { id } = useParams();

    const displayData = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.get('http://localhost:5000/api/users/');
            setUsers(response.data);
            setError('');
        } catch (error) {
            setUsers([]);
            setError('Error fetching users');
        }
    };

    return (
        <div>
            <button onClick={displayData}>Submit</button>
            {error && <p>{error}</p>}
            <ul style={{color: 'white'}}>
                {users.map((user) => (
                    <li key={user._id}>{user.name} ({user.email})</li>
                ))}
            </ul>

            {/* ADMINVIEEW */}
            {/* We need to rename adminview to edit product. */}
            <EditProduct id={id}/>
            <AddProductPage/>
        </div>
    );
}

export default About;