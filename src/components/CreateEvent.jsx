import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const CreateEvent = () => {
    const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState(""); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !description.trim() || !date) {
      alert("All fields are required!");
      return;
    }

    const token = localStorage.getItem('token');
        if (!token) {
            alert('You must be logged in to create an event');
            navigate('/');
            return;
        }
    try {
    const res =  await axios.post(
        'http://localhost:5000/api/events',
        { name, description, date },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("Event created successfully!"); 
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (err) {
      if(err.response){
        if (err.response.status === 401){
          alert("Unauthorized access. Please log in again.");
        localStorage.removeItem('token');
        navigate('/');
        } else if (err.response.status === 403) {
          alert("Session expired. Please log in again.");
          localStorage.removeItem("token");
          navigate("/");
    } else {
        alert(err.response.data.message ||'Error creating event. Please try again.');
    }
    }
};
  return (
    <>
      <form onSubmit={handleSubmit}>
      <h2>Create Event</h2>
      <input
        type="text"
        placeholder="Event Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <br /><br />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      ></textarea>
      <br /><br />
      <input
        type="datetime-local"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <br /><br />
      <button type="submit">Create Event</button>
    </form>
      
    </>
  )
}
}

export default CreateEvent
