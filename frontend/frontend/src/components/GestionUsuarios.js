// GestionUsuarios.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const GestionUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerUsuarios = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/users');
        setUsuarios(response.data);
      } catch (error) {
        console.error('Error al obtener la lista de usuarios:', error.response?.data || error.message);
      }
    };

    obtenerUsuarios();
  }, []);

  const verDetalles = (userId) => {
    // Asegúrate de que userId esté definido antes de navegar
    if (userId) {
      navigate(`/usuarios/${userId}`);
    } else {
      console.error('ID de usuario no válido');
    }
  };

  const editarUsuario = (userId) => {
    navigate(`/usuarios/${userId}/editar`);
  };

  const eliminarUsuario = async (userId) => {
    try {
      // Enviar solicitud al backend para eliminar el usuario
      await axios.delete(`http://localhost:3000/api/users/${userId}`);

      // Actualizar la lista de usuarios después de eliminar
      const response = await axios.get('http://localhost:3000/api/users');
      setUsuarios(response.data);
    } catch (error) {
      console.error('Error al eliminar el usuario:', error.response?.data || error.message);
    }
  };

  return (
    <div>
      <h2>Gestión de Usuarios</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre de Usuario</th>
            <th>Correo Electrónico</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario._id}>
              <td>{usuario._id}</td>
              <td>{usuario.username}</td>
              <td>{usuario.email}</td>
              <td>
                <button onClick={() => verDetalles(usuario._id)}>Ver Detalles</button>
                <button onClick={() => editarUsuario(usuario._id)}>Editar</button>
                <button onClick={() => eliminarUsuario(usuario._id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GestionUsuarios;
