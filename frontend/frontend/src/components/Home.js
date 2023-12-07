// Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h2>Welcome to the CryptoApp Trading Platform</h2>
      <p>
        Thank you for choosing CryptoApp, your go-to platform for seamless cryptocurrency trading. This platform is designed for authorized personnel to efficiently manage cryptocurrency transactions.
      </p>
       <p>
        <strong>Getting Started:</strong>
      </p>
      <ul>
      <li>
          <strong>Register Clients:</strong> Do you need to register a new user? <Link to="/registro">Register here</Link>.
        </li>

      <li>
      <strong>Manage Clients Portfolios:</strong> Visit{' '}
      <Link to="/usuarios">User Management</Link> to create and delete clients, as well as view their portfolios. Here, you can check the current balance, track transactions, and update your profile details.
      </li>
      <li>
      <strong>Explore Top Cryptocurrencies:</strong> 
      Ready to discover the top-performing cryptocurrencies? Check out the <Link to="/topcryptos">Top Cryptos</Link> to stay informed about the latest market trends and values.
      </li>

 
      </ul>
      <p>
        <strong>Key Features:</strong>
      </p>
      <ul>
        <li>
          <strong>Real-time Data:</strong> Stay informed with up-to-the-minute cryptocurrency prices, ensuring you make well-informed decisions.
        </li>
        <li>
          <strong>Portfolio Insights:</strong> Monitor the performance of your crypto holdings with detailed portfolio breakdowns and transaction history.
        </li>
        <li>
          <strong>User-Friendly Interface:</strong> Our platform is designed with simplicity in mind. Enjoy a hassle-free trading experience, whether you're a beginner or an experienced trader.
        </li>
      </ul>
      
      <p>
       
        Happy trading!
        
        <br />
        <br />
        <em>The CryptoApp Team</em>
      </p>
    </div>
  );
};

export default Home;
