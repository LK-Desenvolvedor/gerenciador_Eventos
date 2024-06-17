import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EventList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/events`);
      setEvents(response.data); 
    } catch (error) {
      console.error('Failed to fetch events', error);
    }
  }

  return (
    <div>
      <h2>Event List</h2>
      <div className="event-list">
        {events.map(event => (
          <div key={event.id} className="event">
            <img src={event.imageUrl} alt={event.title} className="event-image" />
            <div className="event-details">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <p>Date: {new Date(event.date).toLocaleDateString()}</p>
              <p>Location: {event.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventList;
