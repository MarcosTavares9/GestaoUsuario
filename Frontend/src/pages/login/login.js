import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usuariosApi } from "../../api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nomeCadastro, setNomeCadastro] = useState("");
  const [emailCadastro, setEmailCadastro] = useState("");
  const [senhaCadastro, setSenhaCadastro] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

      try {
      const response = await usuariosApi.post("/", { email, senha });
      const usuario = response.data.usuario;

      if (!usuario) {
        setError("Credenciais inválidas");
        return;
      }

      localStorage.setItem("usuario", JSON.stringify(usuario));
      navigate("/usuarios");
    } catch (err) {
      setError(err.response?.data?.message || "Erro ao realizar login.");
      console.error("Erro no login:", err);
    }
  };
  const handleCadastro = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    try {
      await usuariosApi.post("/", {
        nome: nomeCadastro,
        email: emailCadastro,
        senha: senhaCadastro,
      });

      setSuccessMessage("Usuário cadastrado com sucesso!");
      setIsModalOpen(false);
    } catch (err) {
      setError("Erro ao cadastrar usuário. Tente novamente.");
      console.error("Erro no cadastro:", err);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="senha" className="block text-gray-700 mb-2">
              Senha
            </label>
            <input
              type="password"
              id="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          {successMessage && (
            <p className="text-green-500 text-sm mb-4">{successMessage}</p>
          )}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
          >
            Entrar
          </button>
        </form>
        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-4 w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
        >
          Cadastrar Novo Login
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-center">
              Cadastrar Usuário
            </h2>
            <form onSubmit={handleCadastro}>
              <div className="mb-4">
                <label htmlFor="nome" className="block text-gray-700 mb-2">
                  Nome
                </label>
                <input
                  type="text"
                  id="nome"
                  value={nomeCadastro}
                  onChange={(e) => setNomeCadastro(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="emailCadastro" className="block text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="emailCadastro"
                  value={emailCadastro}
                  onChange={(e) => setEmailCadastro(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="senhaCadastro" className="block text-gray-700 mb-2">
                  Senha
                </label>
                <input
                  type="password"
                  id="senhaCadastro"
                  value={senhaCadastro}
                  onChange={(e) => setSenhaCadastro(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Cadastrar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
