import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { AuthContext, AuthProvider } from './pages/authContext';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import EventList from './pages/EventList/EventList';
import EventForm from './pages/EventForm/EventForm';
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
              {isAuthenticated && <li><button onClick={logout}>Logout</button></li>}
            </ul>
          </nav>
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
