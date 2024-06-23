import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; 

const Home = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Bem Vindo ao Gerenciador de Eventos</h1>
        <p>Este é o gerenciador de eventos realizado por Luan Monteiro.</p>
      </header>

      <section className="about-section">
        <h2>Sobre Nós</h2>
        <p>O Gerenciador de Eventos é uma plataforma para organizar e gerenciar seus eventos favoritos com facilidade.</p>
      </section>

      <section className="recent-events">
        <h2>Eventos Recentes</h2>
        <div className="events-grid">
          <div className="event">
            <img src="/img/evento1.jpg" alt="Evento 1" className="event-image" />
            <div className="event-details">
              <h3>Natal</h3>
              <p>A magia do natal é uma das coisas mais lindas que existe.</p>
            </div>
          </div>
          <div className="event">
            <img src="/img/evento2.jpg" alt="Evento 2" className="event-image" />
            <div className="event-details">
              <h3>Ano Novo</h3>
              <p>Ano novo é tempo de renovação de vidas.</p>
            </div>
          </div>
          <div className="event">
            <img src="/img/evento3.jpg" alt="Evento 3" className="event-image" />
            <div className="event-details">
              <h3>Carnaval</h3>
              <p>Carnaval é o que faz de nós brasileiros.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonials">
        <img src="/img/evento4.jpg" alt="Evento 1" className="event-image" />
        <h2>O que dizem sobre nós</h2>
        <div className="testimonial">
          <p>"O Gerenciador de Eventos facilitou muito a organização dos nossos eventos anuais. Recomendo!"</p>
          <h4>- Maria Silva</h4>
        </div>
        <div className="testimonial">
          <p>"Uma plataforma indispensável para quem precisa gerenciar múltiplos eventos."</p>
          <h4>- João Pereira</h4>
        </div>
      </section>

      <section className="cta-section">
        <h2>Pronto para gerenciar seus eventos?</h2>
        <p>Junte-se a nós e comece a organizar seus eventos hoje mesmo!</p>
        <Link to="/register">
          <button className="cta-button">Cadastre-se Agora</button>
        </Link>
      </section>

      <footer className="home-footer">
        <p>&copy; 2024 Gerenciador de Eventos por Luan Monteiro. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

export default Home;
