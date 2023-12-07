//Topcryptos
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const TopCryptos = () => {
  const [topCryptos, setTopCryptos] = useState([]);

  useEffect(() => {
    const obtenerTopCryptos = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/transactions/top');
        console.log(response.data);
        setTopCryptos(response.data);
      } catch (error) {
        console.error('Error al obtener el top 10 de criptomonedas:', error.response?.data || error.message);
      }
    };

    obtenerTopCryptos();
  }, []);

  return (
    <div>
      <h2>Top 10 Cryptocurrencies</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Crypto</th>
            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Symbol</th>
            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Price (USD)</th>
          </tr>
        </thead>
        <tbody>
          {topCryptos.map((crypto) => (
            <tr key={crypto.id}>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>{crypto.name}</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>{crypto.symbol}</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>${crypto.current_price.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>
        <Link to="/">Atrás</Link>
       
      </p>
    </div>
  );
};

export default TopCryptos;
