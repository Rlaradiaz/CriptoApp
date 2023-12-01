// App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Registro from './components/Registro';
import GestionUsuarios from './components/GestionUsuarios';
import UsuarioDetalle from './components/UsuarioDetalle';
import EditarUsuario from './components/EditarUsuario'; // Importa el componente de edición de usuario

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/usuarios" element={<GestionUsuarios />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/usuarios/:userId" element={<UsuarioDetalle />} />
        <Route path="/usuarios/:userId/editar" element={<EditarUsuario />} /> {/* Agrega esta línea para la edición de usuario */}

        {/* Otras rutas y componentes */}
      </Routes>
    </div>
  );
};

export default App;
