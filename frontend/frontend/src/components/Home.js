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
      <br />
      <p>
        <strong>Getting Started:</strong>
      </p>
      <ul>
        <li>
          <strong>Login:</strong> Before you start managing cryptocurrency transactions, please <Link to="/login">log in</Link> with your credentials.
        </li>
        <li>
          <strong>Explore Cryptocurrencies:</strong> Visit the <Link to="/cryptocurrencies">Cryptocurrencies</Link> section to discover the latest market trends, prices, and detailed information about various cryptocurrencies.
        </li>
        <li>
          <strong>Manage Your Portfolio:</strong> Head to <Link to="/usuarios">User Management</Link> to view and manage your account. Here, you can check your current balance, track transactions, and update your profile details.
        </li>
        <li>
          <strong>Place Trades:</strong> Ready to dive into the market? Navigate to <Link to="/transactions">Transactions</Link> to buy or sell cryptocurrencies. Our intuitive interface ensures a smooth trading experience.
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
        <strong>Important Note:</strong> Access to this platform is restricted to authorized personnel only. If you encounter any issues or have questions, please contact our support team for assistance.
      </p>
      <p>
        <strong>Ready to Start?</strong> Click <Link to="/login">here</Link> to log in and begin managing your crypto portfolio with our cutting-edge trading features. If you have any questions or need assistance, our support team is here to help.
      </p>
      <p>
        Happy trading!
        <br />
        <em>The CryptoApp Team</em>
      </p>
    </div>
  );
};

export default Home;
