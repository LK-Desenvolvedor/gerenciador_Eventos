import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Login() {
   const [username, setUsername] = React.useState('');
   const [password, setPassword] = React.useState('');
   const [wrongLogin, setWrongLogin] = React.useState(false);
   const [newusername, setNewUsername] = React.useState('');
   const [newemail, setNewEmail] = React.useState(''); // Adicionando estado para o novo email
   const [newpassword, setNewPassword] = React.useState('');
   const [registerSuccess, setRegisterSuccess] = React.useState(false);
   const [registerError, setRegisterError] = React.useState(false);
   const [isChecked, setIsChecked] = React.useState(false); 

   const handleSubmit = (event) => {
     event.preventDefault();
     axios.post('http://localhost:5000/auth/login', {
       email: username,
       password: password
     })

     .then(response => {
       localStorage.setItem('token', response.data.token);

       window.location.href = '/CRUD';
     })

     .catch(error => {
       console.error('Erro no login:', error);
       setWrongLogin(true);
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
    <div className="section">
      <Carrossel/>
      <div className="Login">
        <div className="row full-height justify-content-center">
          <div className="col-12 text-center align-self-center py-5">
            <div className="section pb-5 pt-5 pt-sm-2 text-center">
              <h6 className="mb-0 pb-3"><span>Log In / </span><span>Sign Up</span></h6>
              <input className="checkbox" type="checkbox" id="reg-log" name="reg-log" />
              <label htmlFor="reg-log"></label>
              <div className="card-3d-wrap mx-auto">
                <div className="card-3d-wrapper">
                  <div className="card-front">
                    <div className="center-wrap">
                      <div className="section text-center">
                        <h4 className="mb-4 pb-3">Log In</h4>
                        <h1>Conosco é que se constrói fibra</h1>
                        <br></br>
                        <img src="marombeiro.png" alt="logo" width="200" />
                        <form onSubmit={handleSubmit}>
                          <div className="form-group">
                            <input
                              type="email"
                              className="form-style"
                              placeholder="Email"
                              value={username}
                              onChange={(e) => setUsername(e.target.value)}
                            />
                            <i className="input-icon uil uil-at" />
                          </div>
                          <div className="form-group mt-2">
                            <input
                              type="password"
                              className="form-style"
                              placeholder="Password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                            />
                            <i className="input-icon uil uil-lock-alt" />
                          </div>
                          <button type="submit" className="btn mt-4">Login</button>
                          {wrongLogin && <p className="error-message">Login inválido. Por favor, tente novamente.</p>}
                        </form>
                        <p className="mb-0 mt-4 text-center">
                          <a href="" className="link">Forgot your password?</a>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="card-back">
                    <div className="center-wrap">
                      <div className="section text-center">
                        <h4 className="mb-3 pb-3">Sign Up</h4>
                        <img src="marombeiro.png" alt="logo" width="200" />
                        <form onSubmit={handleRegister}>
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-style"
                              placeholder="Full Name"
                              value={newusername}
                              onChange={(e) => setNewUsername(e.target.value)}
                            />
                            <i className="input-icon uil uil-user" />
                          </div>
                          <div className="form-group">
                            <input
                              type="email"
                              className="form-style"
                              placeholder="Email"
                              value={newemail}
                              onChange={(e) => setNewEmail(e.target.value)} // Corrigindo para setNewEmail
                            />
                            <i className="input-icon uil uil-at" />
                          </div>
                          <div className="form-group mt-2">
                            <input
                              type="password"
                              className="form-style"
                              placeholder="Password"
                              value={newpassword}
                              onChange={(e) => setNewPassword(e.target.value)}
                            />
                            <i className="input-icon uil uil-lock-alt" />
                          </div>
                          <button type="submit" className="btn mt-4">Register</button>
                          {registerError && <p className="error-message">Erro ao registrar. Por favor, tente novamente.</p>}
                          {registerSuccess && <p className="success-message">Registro bem-sucedido!</p>}
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Carrossel() {
  const [index, setIndex] = useState(0);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const imageFiles = require.context('../public/carrossel', true, /\.(png|jpe?g|svg)$/);
    const imagePaths = imageFiles.keys();
    const images = imagePaths.map((path) => imageFiles(path));
    setImages(images);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className="car">
      <img src={images[index]} alt={`imagem ${index}`} />
    </div>
  );
}

export default Login;