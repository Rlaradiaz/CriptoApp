// UsuarioDetalle.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const UsuarioDetalle = () => {
  const { userId } = useParams();
  const [usuario, setUsuario] = useState(null);

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

  if (!usuario) {
    return <p>Cargando detalles del usuario...</p>;
  }

  return (
    <div>
      <h2>Detalles del Usuario</h2>
      <p>ID: {usuario._id}</p>
      <p>Nombre de Usuario: {usuario.username}</p>
      <p>Correo Electrónico: {usuario.email}</p>

      {/* Agrega un mensaje informativo */}
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

      {/* Valor Portafolio */}
      <h3>Valor Portafolio: ${usuario.valorPortafolio.toFixed(2)}</h3>

      {/* Enlaces para navegar */}
      <p>
        <Link to="/usuarios">Atrás</Link>
        {' | '}
        <Link to="/registro">Registro</Link>
      </p>
    </div>
  );
};

export default UsuarioDetalle;
