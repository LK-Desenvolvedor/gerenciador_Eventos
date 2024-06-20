import React, { useState, useContext } from 'react';
import axios from 'axios';
import './Login.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../authContext';

function Login() {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:5000/auth/login', {
      email: username,
      password: password
    })
    .then(response => {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userType', response.data.tipo);

      toast.success('Login bem-sucedido!', {
        position: 'top-right',
        autoClose: 3000
      });

      // Atualiza o estado de autenticação
      login(response.data.tipo === 'admin');

      setTimeout(() => {
        if (response.data.tipo === 'admin') {
          window.location.href = '/admin-dashboard'; 
        } else {
          window.location.href = '/events'; 
        }
      }, 3000);
    })
    .catch(error => {
      console.error('Erro no login:', error);
      toast.error('Erro no login. Por favor, tente novamente.', {
        position: 'top-right',
        autoClose: 3000
      });
    });
  }

  return (
    <div className="login-container">
      <ToastContainer />
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            className="form-style"
            placeholder="Email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />        
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            className="form-style"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />        
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
