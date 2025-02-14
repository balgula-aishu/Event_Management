import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Dashboard  = () => {
    const [events, setEvents] = useState([]);
    const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get('/api/events', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        if (Array.isArray(res.data)) {
            setEvents(res.data);
          } else {
            setEvents([]);
            setError('Unexpected data format');
          }
        } catch (err) {
          console.error(err);
          setError('Failed to fetch events');
        }
      };
    fetchEvents();
  }, []);
  return (
    <div>
       <h1>Event Dashboard</h1>
      <Link to="/create-event" id="event">Create Event</Link>
      {error && <p>{error}</p>}
      <ul>
      {events.length > 0 ? (
        events.map((event) => (
          <li key={event._id}>
            <h2>{event.name}</h2>
            <p>{event.description}</p>
            <p>{new Date(event.date).toLocaleString()}</p>
            <p>Attendees: {event.attendees.length}</p>
          </li>
        ))
    ):(
        <p>No events available</p>
    )}
    
      </ul>
    </div>
  )
}

export default Dashboard
