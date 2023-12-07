// UsuarioDetalle.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const UsuarioDetalle = () => {
  const { userId } = useParams();
  const [usuario, setUsuario] = useState(null);
  const [crypto, setCrypto] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [accion, setAccion] = useState('compra');

  useEffect(() => {
    const obtenerUsuario = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/users/${userId}`);
        setUsuario(response.data);
      } catch (error) {
        console.error('Error al obtener detalles del usuario:', error.response?.data || error.message);
      }
    };
    obtenerUsuario();
  }, [userId]);

  const handleTransaction = async (e) => {
    e.preventDefault();

    const url = accion === 'compra'
      ? 'http://localhost:3000/api/transactions/transactions'
      : 'http://localhost:3000/api/transactions/sell';
    
    
    const cryptoId = usuario.cryptoHoldings && usuario.cryptoHoldings[crypto]
      ? crypto 
      : null;

    if(accion === 'venta' && !cryptoId) {
      alert('La criptomoneda especificada no es válida o no se encuentra en la cartera del usuario.');
      return;
    }

    const payload = {
      userId,
      cryptocurrencyId: cryptoId,
      ...(accion === 'compra'
        ? { totalCost: parseFloat(cantidad) }
        : { quantitySold: parseFloat(cantidad) }),
    };

    try {
      const response = await axios.post(url, payload);
      console.log('Respuesta del servidor:', response.data);

      const updatedUserResponse = await axios.get(`http://localhost:3000/api/users/${userId}`);
      setUsuario(updatedUserResponse.data);

      setCrypto('');
      setCantidad('');
      setAccion('compra');
    } catch (error) {
      console.error('Error al realizar la transacción:', error.response?.data || error.message);
    }
  };

  if (!usuario) {
    return <p>Cargando detalles del usuario...</p>;
  }


  return (
    <div>
      <h2>Detalles del Usuario</h2>
      <p>ID: {usuario._id}</p>
      <p>Nombre de Usuario: {usuario.username}</p>
      <p>Correo Electrónico: {usuario.email}</p>
      
      <p>Todos los usuarios comienzan con $50,000 para invertir en criptomonedas.</p>
      <h3>Resumen Financiero</h3>
      <p>Efectivo: ${usuario.efectivo.toFixed(2)}</p>
      {/* CryptoHoldings */}
      {Object.keys(usuario.cryptoHoldings).length > 0 && (
        <>
          <h3>CryptoHoldings</h3>
          <table>
            <thead>
              <tr>
                <th>Crypto</th>
                <th>Cantidad</th>
                <th>Valor en USD</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(usuario.cryptoHoldings).map(([crypto, cantidad]) => (
                <tr key={crypto}>
                  <td>{crypto}</td>
                  <td>{cantidad}</td>
                  <td>{usuario.cryptoHoldingsValue[crypto]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
      <h3>Valor Portafolio: ${usuario.valorPortafolio.toFixed(2)}</h3>
      <h3>Realizar Transacción</h3>
      <form onSubmit={handleTransaction}>
        <label>
          Criptomoneda:
          <input type="text" value={crypto} onChange={(e) => setCrypto(e.target.value)} />
        </label>
        <br />
        <label>
          Cantidad:
          <input type="number" value={cantidad} onChange={(e) => setCantidad(e.target.value)} />
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
      <p>
        <Link to="/usuarios">Atrás</Link>
      </p>
    </div>
  );
};

export default UsuarioDetalle;