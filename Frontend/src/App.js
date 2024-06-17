import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './styles/App.css';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import EventList from './pages/EventList/EventList';
import EventForm from './pages/EventForm/EventForm';


function App() {
  return (
    <Router>
      <div className="app-container">
        <nav>
          <ul>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Cadastro</Link></li>
            <li><Link to="/events">Eventos</Link></li>
            <li><Link to="/events/create">Criar Evento</Link></li>
          </ul>
        </nav>
        
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/events" element={<EventList />} />
            <Route path="/events/create" element={<EventForm />} />
          </Routes>
        </div>

        <footer>
          <p>&copy; 2024 Gerenciador de Eventos por Luan Monteiro. Todos os direitos reservados.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
