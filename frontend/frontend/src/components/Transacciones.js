// Transacciones.js
import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Transacciones = () => {
  const { userId } = useParams(); 
  const [crypto, setCrypto] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [accion, setAccion] = useState('compra'); 

  const realizarTransaccion = async () => {
    try {
      
      const transactionDetails = {
        userId, 
        cryptocurrencyId: crypto, 
        
        ...(accion === 'compra' ? { totalCost: parseFloat(cantidad) } : { quantitySold: parseFloat(cantidad) }),
      };

      // Define la URL basado en si es compra o venta
      const url = accion === 'compra' ?
        'http://localhost:3000/api/transactions/transactions' :
        'http://localhost:3000/api/transactions/sell';

      
      const response = await axios.post(url, transactionDetails);

     
      console.log('Transacción exitosa:', response.data);
 
      
    } catch (error) {
     
      console.error('Error al realizar la transacción:', error.response?.data || error.message);
     
    }
  };

  const handleTransaction = (e) => {
    e.preventDefault();
    realizarTransaccion();
  };

  return (
    <div>
      <h2>Realizar Transacción</h2>
      <form onSubmit={handleTransaction}>
        <label>
          Criptomoneda (ID):
          <input type="text" value={crypto} onChange={(e) => setCrypto(e.target.value)} />
        </label>
        <br />
        <label>
          Cantidad [{accion === 'compra' ? 'Costo total USD' : 'Cantidad a vender'}]:
          <input type="number" step="0.01" value={cantidad} onChange={(e) => setCantidad(e.target.value)} />
        </label>
        <br />
        <label>
          Acción:
          <select value={accion} onChange={(e) => setAccion(e.target.value)}>
            <option value="compra">Compra</option>
            <option value="venta">Venta</option>
          </select>
        </label>
        <br />
        <button type="submit">Confirmar Transacción</button>
      </form>
    </div>
  );
};

export default Transacciones;