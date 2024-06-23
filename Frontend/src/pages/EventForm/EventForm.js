import React, { useState } from "react";
import axios from "axios";

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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const addEvent = async () => {
    try {
      if (
        newEvent.title.trim() !== "" &&
        newEvent.description.trim() !== "" &&
        newEvent.date.trim() !== "" &&
        newEvent.location.trim() !== ""
      ) {
        await axios.post("http://localhost:5000/events", newEvent);
        setEvents([...events, newEvent]);
        setNewEvent({
          title: "",
          description: "",
          date: "",
          location: "",
          imageUrl: "",
        });
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
          await axios.post("http://localhost:5000/events", newEvent);
          setEvents([...events, newEvent]);
        } else {
          await axios.put(
            `http://localhost:5000/events/${events[editIndex]._id}`,
            newEvent
          );
          const updatedEvents = [...events];
          updatedEvents[editIndex] = { ...newEvent };
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
    <div>
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
      <ul>
        {events.map((event, index) => (
          <li key={index}>
            {event.title} - {event.date} - {event.location}
            <button onClick={() => editEvent(index)}>Edit</button>
            <button onClick={() => deleteEvent(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventForm;
