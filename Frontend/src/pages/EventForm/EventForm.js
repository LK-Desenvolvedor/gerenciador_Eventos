import React, { useState, useEffect } from "react";
import axios from "axios";
import "./EventForm.css";

const EventForm = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    imageUrl: "",
  });
  const [editIndex, setEditIndex] = useState(-1);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:5000/events");
      setEvents(response.data);
    } catch (error) {
      console.error("Erro ao buscar eventos", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const addEvent = async (event) => {
    event.preventDefault();
    try {
      if (
        newEvent.title.trim() !== "" &&
        newEvent.description.trim() !== "" &&
        newEvent.date.trim() !== "" &&
        newEvent.location.trim() !== ""
      ) {
        const response = await axios.post("http://localhost:5000/events", newEvent);
        setEvents([...events, response.data]);
        setNewEvent({
          title: "",
          description: "",
          date: "",
          location: "",
          imageUrl: "",
        });
        alert("Evento criado com sucesso!");
      } else {
        alert("Por favor, preencha todos os campos do evento.");
      }
    } catch (error) {
      console.error("Erro ao criar evento", error);
      alert("Falha ao criar evento. Por favor, tente novamente.");
    }
  };

  const editEvent = (index) => {
    setEditIndex(index);
    setNewEvent(events[index]);
  };

  const saveEvent = async (event) => {
    event.preventDefault();
    try {
      if (
        newEvent.title.trim() !== "" &&
        newEvent.description.trim() !== "" &&
        newEvent.date.trim() !== "" &&
        newEvent.location.trim() !== ""
      ) {
        if (editIndex === -1) {
          const response = await axios.post("http://localhost:5000/events", newEvent);
          setEvents([...events, response.data]);
        } else {
          const response = await axios.put(
            `http://localhost:5000/events/${events[editIndex]._id}`,
            newEvent
          );
          const updatedEvents = [...events];
          updatedEvents[editIndex] = response.data;
          setEvents(updatedEvents);
        }
        setNewEvent({
          title: "",
          description: "",
          date: "",
          location: "",
          imageUrl: "",
        });
        setEditIndex(-1);
        alert("Evento criado/atualizado com sucesso!");
      } else {
        alert("Por favor, preencha todos os campos do evento.");
      }
    } catch (error) {
      console.error("Falha ao criar/atualizar evento", error);
      alert("Falha ao criar/atualizar evento. Por favor, tente novamente.");
    }
  };

  const deleteEvent = async (index) => {
    try {
      await axios.delete(`http://localhost:5000/events/${events[index]._id}`);
      const updatedEvents = events.filter((event, i) => i !== index);
      setEvents(updatedEvents);
      alert("Evento deletado com sucesso!");
    } catch (error) {
      console.error("Falha ao deletar evento", error);
      alert("Falha ao deletar evento. Por favor, tente novamente.");
    }
  };

  return (
    <div className="event-form-container">
      <h2>Create Event</h2>
      <form onSubmit={editIndex === -1 ? addEvent : saveEvent}>
        <input
          type="text"
          name="title"
          value={newEvent.title}
          onChange={handleInputChange}
          placeholder="Title"
          required
        />
        <input
          type="text"
          name="description"
          value={newEvent.description}
          onChange={handleInputChange}
          placeholder="Description"
          required
        />
        <input
          type="date"
          name="date"
          value={newEvent.date}
          onChange={handleInputChange}
          placeholder="Date"
          required
        />
        <input
          type="text"
          name="location"
          value={newEvent.location}
          onChange={handleInputChange}
          placeholder="Location"
          required
        />
        <input
          type="text"
          name="imageUrl"
          value={newEvent.imageUrl}
          onChange={handleInputChange}
          placeholder="Image URL"
        />
        <button type="submit">
          {editIndex === -1 ? "Create Event" : "Save Event"}
        </button>
      </form>
      <div className="event-list">
        {events.map((event, index) => (
          <div key={index} className="event-item">
            <div>
              <h3>{event.title}</h3>
              <p>{new Date(event.date).toLocaleDateString()}</p>
              <p>{event.location}</p>
            </div>
            <div>
              <button onClick={() => editEvent(index)}>Edit</button>
              <button onClick={() => deleteEvent(index)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventForm;
