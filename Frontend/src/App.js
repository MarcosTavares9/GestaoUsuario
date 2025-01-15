import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Usuarios from './pages/usuarios/usuarios';
import Login from './pages/login/login';
import NovoCadastro from './pages/cadastrousarios/cadastro';
import UsuarioLogin from './pages/usuariologin/usuariosL';
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app">
        <div className="content">
          <Routes>
            {/* Página inicial: Tela de login */}
            <Route path="/" element={<Login />} />
                    
            {/* Listagem de usuários */}
            <Route path="/usuarios" element={<Usuarios />} />
            
            {/* Cadastro adicional para um tipo específico de usuário */}
            <Route path="/usuarios/cadastro" element={<NovoCadastro />} />
            
            {/* Login específico para usuários */}
            <Route path="/usuarioslogin" element={<UsuarioLogin />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
