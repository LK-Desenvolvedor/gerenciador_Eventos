import React from 'react';
import './Home.css'; // Estilos da página

const Home = () => {
  return (
    <div className="home-container">
      <h1>Bem Vindo ao Gerenciador de Eventos</h1>
      <p>Este é o gerenciador de eventos realizado por Luan Monteiro.</p>

      <div className="recent-events">
        <h2>Eventos Recentes</h2>
        <div className="event">
          <img src="/img/evento1.jpg" alt="Evento 1" className="image-size" />
          <div className="event-details">
            <h3>Natal</h3>
            <p>A magia do natal é uma das coisas mais lindas que existe.</p>
          </div>
        </div>
        <div className="event">
          <img src="/img/evento2.jpg" alt="Evento 2" className="image-size" />
          <div className="event-details">
            <h3>Ano Novo</h3>
            <p>Ano novo é tempo de renovação de vidas.</p>
          </div>
        </div>
        <div className="event">
          <img src="/img/evento3.jpg" alt="Evento 3" className="image-size" />
          <div className="event-details">
            <h3>Carnaval</h3>
            <p>Carnaval é o que faz de nós brasileiros.</p>
          </div>
        </div>
      </div>

      <footer>
        <p>&copy; 2024 Gerenciador de Eventos por Luan Monteiro. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

export default Home;
