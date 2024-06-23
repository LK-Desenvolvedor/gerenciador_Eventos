import React, { useContext, useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { AuthContext, AuthProvider } from './pages/authContext';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import EventList from './pages/EventList/EventList';
import EventForm from './pages/EventForm/EventForm';
import { FaUserCircle } from 'react-icons/fa';
import './styles/App.css';
import './styles/index.css';

function App() {
  const { isAuthenticated, isAdmin, logout } = useContext(AuthContext);

  return (
    <Router>
      <div className="app-container">
        <header>
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              {isAuthenticated && <li><Link to="/events">Eventos</Link></li>}
              {isAdmin && <li><Link to="/create-event">Criar Evento</Link></li>}
              {!isAuthenticated && <li><Link to="/login">Login</Link></li>}
              {!isAuthenticated && <li><Link to="/register">Cadastro</Link></li>}
            </ul>
          </nav>
          {isAuthenticated && (
            <div className="user-actions">
              <FaUserCircle className="user-icon" />
              <button className="logout-button" onClick={logout}>Logout</button>
            </div>
          )}
        </header>
        <main>
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/events" element={<EventList />} />
              {isAdmin && <Route path="/create-event" element={<EventForm />} />}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </div>
        </main>
        <ScrollToTopButton />
        <Chat />
      </div>
    </Router>
  );
}

export default function AppWrapper() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}

function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    if (window.pageYOffset > 300) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  window.addEventListener('scroll', toggleVisible);

  return (
    <button
      className="scroll-to-top"
      onClick={scrollToTop}
      style={{ display: visible ? 'inline' : 'none' }}
    >
      ↑
    </button>
  );
}

function Chat() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { text: 'Olá! Este é o chat para esclarecer dúvidas e pedir ajuda.', from: 'system' }
  ]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const sendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, { text: message, from: 'user' }]);
      setMessage('');
    }
  };

  return (
    <div className={`chat-container ${isOpen ? 'open' : ''}`}>
      <div className="chat-header" onClick={toggleChat}>
        Chat de Ajuda
        <button className="chat-toggle">{isOpen ? '−' : '+'}</button>
      </div>
      {isOpen && (
        <div className="chat-body">
          <div className="messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.from}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Digite sua mensagem..."
            />
            <button onClick={sendMessage}>Enviar</button>
          </div>
        </div>
      )}
    </div>
  );
}
