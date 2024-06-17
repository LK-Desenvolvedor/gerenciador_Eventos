import React, { useState } from 'react';
import api from '../../services/api';

const EventForm = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    imageUrl: '',
  });
  const [editIndex, setEditIndex] = useState(-1);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const addEvent = () => {
    if (
      newEvent.title.trim() !== '' &&
      newEvent.description.trim() !== '' &&
      newEvent.date.trim() !== '' &&
      newEvent.location.trim() !== ''
    ) {
      setEvents([...events, { ...newEvent }]);
      setNewEvent({
        title: '',
        description: '',
        date: '',
        location: '',
        imageUrl: '',
      });
    }
  };

  const editEvent = (index) => {
    setEditIndex(index);
    setNewEvent(events[index]);
  };

  const saveEvent = async (event) => {
    event.preventDefault();
    try {
      await api.post('/events', newEvent);
      const updatedEvents = [...events];
      updatedEvents[editIndex] = { ...newEvent };
      setEvents(updatedEvents);
      setNewEvent({
        title: '',
        description: '',
        date: '',
        location: '',
        imageUrl: '',
      });
      setEditIndex(-1);
      alert('Evento criado com sucesso!');
    } catch (error) {
      console.error('Falha ao criar evento', error);
      alert('Falha ao criar evento. Por favor, tente novamente.');
    }
  };

  const deleteEvent = (index) => {
    const updatedEvents = events.filter((event, i) => i !== index);
    setEvents(updatedEvents);
  };

  return (
    <div>
      <h2>Create Event</h2>
      <form onSubmit={editIndex === -1 ? addEvent : saveEvent}>
        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={newEvent.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={newEvent.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Date</label>
          <input
            type="date"
            name="date"
            value={newEvent.date}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={newEvent.location}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Image URL</label>
          <input
            type="text"
            name="imageUrl"
            value={newEvent.imageUrl}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">
          {editIndex === -1 ? 'Create Event' : 'Save Event'}
        </button>
      </form>
      <ul>
        {events.map((event, index) => (
          <li key={index}>
            <div>
              <strong>{event.title}</strong>
              <p>{event.description}</p>
              <p>Date: {event.date}</p>
              <p>Location: {event.location}</p>
              {event.imageUrl && <img src={event.imageUrl} alt="Event" />}
            </div>
            <div>
              <button onClick={() => editEvent(index)}>Edit</button>
              <button onClick={() => deleteEvent(index)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventForm;
