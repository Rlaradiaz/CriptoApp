import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Registro = () => {
  const [usuario, setUsuario] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [registroExitoso, setRegistroExitoso] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Enviar solicitud de registro al backend
      const response = await axios.post('http://localhost:3000/api/users', {
        username: usuario,
        email: correo,
        password: contrasena,
      });

      // Verificar si hay datos en la respuesta antes de intentar acceder a ellos
      if (response && response.data) {
        // Manejar la respuesta del servidor
        console.log('Respuesta del servidor:', response.data);

        
        setRegistroExitoso(true);

        // Limpiar los campos del formulario
        setUsuario('');
        setCorreo('');
        setContrasena('');

        
      } else {
        console.error('La respuesta del servidor no contiene datos:', response);
      }
    } catch (error) {
      console.error('Error al registrar:', error.response?.data || error.message);
      
    }
  };

  return (
    <div>
      <h2>Registro</h2>
      {registroExitoso && <p>¡Registro exitoso!</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Nombre de Usuario:
          <input type="text" value={usuario} onChange={(e) => setUsuario(e.target.value)} />
        </label>
        <br />
        <label>
          Correo Electrónico:
          <input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} />
        </label>
        <br />
        <label>
          Contraseña:
          <input type="password" value={contrasena} onChange={(e) => setContrasena(e.target.value)} />
        </label>
        <br />
        <button type="submit">Registrarse</button>

        
      </form>

      <p>
        <Link to="/">Atrás</Link>
       
      </p>
      
    </div>
  );
};

export default Registro;
