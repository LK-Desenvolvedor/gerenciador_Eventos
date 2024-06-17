import api from '../../services/api'; // Certifique-se que o caminho para api.js está correto
import './Register.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Register() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [wrongRegister, setWrongRegister] = React.useState(false);
  const [newusername, setNewUsername] = React.useState('');
  const [newemail, setNewEmail] = React.useState(''); 
  const [newpassword, setNewPassword] = React.useState('');
  const [registerSuccess, setRegisterSuccess] = React.useState(false);
  const [registerError, setRegisterError] = React.useState(false);
  const [isChecked, setIsChecked] = React.useState(false); 

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:5000/auth/Register', {
      email: username,
      password: password
    })

    .then(response => {
      localStorage.setItem('token', response.data.token);

      window.location.href = '/CRUD';
    })

    .catch(error => {
      console.error('Erro no Register:', error);
      setWrongRegister(true);
    });
  }

  const handleRegister = (event) => {
    event.preventDefault();

    axios.post('http://localhost:5000/auth/register', {
      name: newusername,
      email: newemail,
      password: newpassword
    })
    .then(response => {
      console.log('Registro bem-sucedido:', response.data);
      setNewUsername('');
      setNewEmail('');
      setNewPassword('');
      setRegisterSuccess(true);
      setRegisterError(false);
    })
    .catch(error => {
      console.error('Erro no registro:', error);
      setRegisterError(true);
      setRegisterSuccess(false);
    });
  }

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label>Name</label>
          <input
                              type="text"
                              className="form-style"
                              placeholder="Full Name"
                              value={newusername}
                              onChange={(e) => setNewUsername(e.target.value)}
                            />
        </div>
        <div>
          <label>Email</label>
        
          <input
                              type="email"
                              className="form-style"
                              placeholder="Email"
                              value={newemail}
                              onChange={(e) => setNewEmail(e.target.value)}
                            />
        
        </div>
        <div>
          <label>Password</label>
        
          <input
                              type="password"
                              className="form-style"
                              placeholder="Password"
                              value={newpassword}
                              onChange={(e) => setNewPassword(e.target.value)}
                            />
        
        </div>
        <button type="submit" className="btn mt-4">Register</button>
                          {registerError && <p className="error-message">Erro ao registrar. Por favor, tente novamente.</p>}
                          {registerSuccess && <p className="success-message">Registro bem-sucedido!</p>}
      </form>
    </div>
  );
}

export default Register;
