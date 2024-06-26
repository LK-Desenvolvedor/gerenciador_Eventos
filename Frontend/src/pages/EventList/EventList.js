import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../authContext';

const EventList = () => {
  const { currentUser } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [participants, setParticipants] = useState({});

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:5000/events");
      setEvents(response.data);
      fetchParticipants();
    } catch (error) {
      console.error("Erro ao buscar eventos", error);
    }
  };

  const fetchParticipants = async () => {
    try {
      const response = await axios.get("http://localhost:5000/participants");
      const participantData = response.data.reduce((acc, participant) => {
        if (!acc[participant.event]) {
          acc[participant.event] = [];
        }
        acc[participant.event].push(participant.user);
        return acc;
      }, {});
      setParticipants(participantData);
    } catch (error) {
      console.error("Erro ao buscar participantes", error);
    }
  };

  const handleSubscribe = async (eventId) => {
    if (!currentUser) {
      console.error("Usuário não está logado");
      return;
    }
    try {
      const response = await axios.post("http://localhost:5000/participants", {
        event: eventId,
        user: currentUser._id
      });
      setParticipants(prev => ({
        ...prev,
        [eventId]: [...(prev[eventId] || []), currentUser]
      }));
    } catch (error) {
      console.error("Erro ao se inscrever no evento", error);
    }
  };

  const handleUnsubscribe = async (eventId) => {
    if (!currentUser) {
      console.error("Usuário não está logado");
      return;
    }
    try {
      const participant = participants[eventId].find(p => p._id === currentUser._id);
      await axios.delete(`http://localhost:5000/participants/${participant._id}`);
      setParticipants(prev => ({
        ...prev,
        [eventId]: prev[eventId].filter(p => p._id !== currentUser._id)
      }));
    } catch (error) {
      console.error("Erro ao cancelar inscrição do evento", error);
    }
  };

  return (
    <div className="event-list">
      {events.map((event, index) => (
        <div key={index} className="event-item">
          <div>
            <h3>{event.title}</h3>
            <p>{new Date(event.date).toLocaleDateString()}</p>
            <p>{event.location}</p>
            <div>
              <h4>Participantes:</h4>
              <ul>
                {participants[event._id] && participants[event._id].map(participant => (
                  <li key={participant._id}>{participant.name}</li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            {participants[event._id] && participants[event._id].some(p => p._id === currentUser?._id) ? (
              <button onClick={() => handleUnsubscribe(event._id)}>Cancelar Inscrição</button>
            ) : (
              <button onClick={() => handleSubscribe(event._id)}>Inscrever-se</button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventList;
