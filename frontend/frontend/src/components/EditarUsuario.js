// EditarUsuario.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditarUsuario = () => {
  const { userId } = useParams();
  const [usuario, setUsuario] = useState(null);
  const [nuevoUsername, setNuevoUsername] = useState('');
  const [nuevoEmail, setNuevoEmail] = useState('');
  const navigate = useNavigate();

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:3000/api/users/${userId}`, {
        username: nuevoUsername,
        email: nuevoEmail,
        // Otros campos que desees actualizar
      });

      // Manejar la respuesta del servidor, por ejemplo, redirigir o mostrar un mensaje de éxito
      navigate(`/usuarios/${userId}`);
    } catch (error) {
      console.error('Error al actualizar el usuario:', error.response?.data || error.message);
    }
  };

  if (!usuario) {
    return <p>Cargando detalles del usuario...</p>;
  }

  return (
    <div>
      <h2>Editar Usuario</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nuevo Nombre de Usuario:
          <input type="text" value={nuevoUsername} onChange={(e) => setNuevoUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Nuevo Correo Electrónico:
          <input type="email" value={nuevoEmail} onChange={(e) => setNuevoEmail(e.target.value)} />
        </label>
        <br />
        {/* Agregar más campos según tus necesidades */}
        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default EditarUsuario;
