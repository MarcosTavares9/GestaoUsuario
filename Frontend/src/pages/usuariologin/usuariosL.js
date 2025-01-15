// Importações
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usuariosApi } from "../../api";

const UsuarioLogin = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Função para buscar a lista de usuários
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await usuariosApi.get("/");
        setUsuarios(response.data);
      } catch (err) {
        setError("Erro ao carregar a lista de usuários.");
        console.error("Erro ao buscar usuários:", err);
      }
    };

    fetchUsuarios();
  }, []);

  return (
    <div className="p-6 font-sans">
      <h1 className="text-2xl font-bold mb-4">Lista de Usuários</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="overflow-auto max-h-[500px] border border-gray-300 rounded-lg p-4">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-blue-900 text-white">
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Nome</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Senha</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario, index) => (
              <tr
                key={usuario.id}
                className={
                  index % 2 === 0
                    ? "bg-gray-100 hover:bg-gray-200"
                    : "bg-white hover:bg-gray-200"
                }
              >
                <td className="px-4 py-2 text-center">{usuario.id}</td>
                <td className="px-4 py-2 text-center">{usuario.nome}</td>
                <td className="px-4 py-2 text-center">{usuario.email}</td>
                <td className="px-4 py-2 text-center">{usuario.senha}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        onClick={() => navigate("/usuarios")}
        className="mt-4 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
      >
        Voltar para Usuários
      </button>
    </div>
  );
};

export default UsuarioLogin;
