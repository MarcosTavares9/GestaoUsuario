// Importações
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { novosUsuariosApi } from "../../api";

// Componente de cadastro de novos usuários
const CadastroUsuario = () => {
  const [formData, setFormData] = useState({
    nome: "",
    ramal: "",
    senha: "",
    status: "Ativo", // Valor padrão inicial para status
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleCadastro = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await novosUsuariosApi.post("/", formData);
      alert("Usuário cadastrado com sucesso!");
      navigate("/usuarios");
    } catch (err) {
      setError("Erro ao cadastrar usuário. Verifique os dados e tente novamente.");
      console.error("Erro ao cadastrar usuário:", err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value, // Atualiza o estado com o valor correto
    }));
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Cadastrar Novo Usuário</h1>
        <form onSubmit={handleCadastro}>
          {/* Campo Nome */}
          <div className="mb-4">
            <label htmlFor="nome" className="block text-gray-700 mb-2">
              Nome
            </label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          {/* Campo Ramal */}
          <div className="mb-4">
            <label htmlFor="ramal" className="block text-gray-700 mb-2">
              Ramal
            </label>
            <input
              type="text"
              id="ramal"
              name="ramal"
              value={formData.ramal}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          {/* Campo Senha */}
          <div className="mb-4">
            <label htmlFor="senha" className="block text-gray-700 mb-2">
              Senha
            </label>
            <input
              type="password"
              id="senha"
              name="senha"
              value={formData.senha}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          {/* Campo Status */}
          <div className="mb-4">
            <label htmlFor="status" className="block text-gray-700 mb-2">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status} // Reflete o valor atual do estado
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="Ativo">Ativo</option>
              <option value="Inativo">Inativo</option>
            </select>
          </div>

          {/* Exibição de Erros */}
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          {/* Botões */}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => navigate("/usuarios")}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            >
              Voltar
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
  );
};

export default CadastroUsuario;
