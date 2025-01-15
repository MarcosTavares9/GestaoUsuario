import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { novosUsuariosApi } from "../../api";

// Hook para gerenciar usuários
const UseUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const { data } = await novosUsuariosApi.get("/");
        setUsuarios(data);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    };
    fetchUsuarios();
  }, []);

  const excluirUsuario = async (id) => {
    try {
      await novosUsuariosApi.delete(`/${id}`);
      setUsuarios((prev) => prev.filter((u) => u.id !== id));
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
    }
  };

  const atualizarUsuario = async (id, data) => {
    try {
      const response = await novosUsuariosApi.put(`/${id}`, data);
      setUsuarios((prev) => prev.map((u) => (u.id === id ? response.data : u)));
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
    }
  };

  return {
    usuarios,
    excluirUsuario,
    atualizarUsuario,
  };
};

// Componente principal
const Usuarios = () => {
  const { usuarios, excluirUsuario, atualizarUsuario } = UseUsuarios();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [usuarioEdit, setUsuarioEdit] = useState(null);
  const [nomeFiltro, setNomeFiltro] = useState("");
  const [statusFiltro, setStatusFiltro] = useState("");

  // Filtrar usuários com base no nome e no status
  const usuariosFiltrados = usuarios.filter((usuario) => {
    const nomeInclui = usuario.nome
      .toLowerCase()
      .includes(nomeFiltro.toLowerCase());
    const statusInclui =
      statusFiltro === "" || usuario.status === statusFiltro;
    return nomeInclui && statusInclui;
  });

  const openEditModal = (usuario) => {
    setUsuarioEdit(usuario);
    setModalOpen(true);
  };

  const closeModal = () => {
    setUsuarioEdit(null);
    setModalOpen(false);
  };

  const handleEdit = (e) => {
    const { name, value } = e.target;
    setUsuarioEdit((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const saveChanges = async () => {
    if (usuarioEdit) {
      try {
        await atualizarUsuario(usuarioEdit.id, usuarioEdit);
        closeModal();
      } catch (error) {
        console.error("Erro ao salvar alterações:", error);
      }
    }
  };

  return (
    <div className="p-6 font-sans">
      <h1 className="text-4xl font-bold mb-4">Lista de Usuários</h1>
      <div className="mb-4 flex gap-4">
        <button
          onClick={() => navigate("/usuarios/cadastro")}
          className="px-4 py-2 bg-yellow-500 text-blue-900 rounded hover:bg-yellow-600 hover:text-white transition "
        >
          + Cadastrar Usuário
        </button>
        <button
          onClick={() => navigate("/usuarioslogin")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Ver Usuários Login
        </button>
      </div>

      {/* Filtros */}
      <div className="mb-4 flex gap-4 items-center">
        <input
          type="text"
          placeholder="Filtrar por nome"
          value={nomeFiltro}
          onChange={(e) => setNomeFiltro(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <select
          value={statusFiltro}
          onChange={(e) => setStatusFiltro(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Todos os Status</option>
          <option value="Ativo">Ativo</option>
          <option value="Inativo">Inativo</option>
        </select>
      </div>

      {/* Tabela de Usuários */}
      <div className="overflow-auto max-h-[500px] border border-gray-300 rounded-lg p-4">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-blue-900 text-white">
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Nome</th>
              <th className="px-4 py-2">Ramal</th>
              <th className="px-4 py-2">Senha</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {usuariosFiltrados.map((usuario, index) => (
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
                <td className="px-4 py-2 text-center">{usuario.ramal}</td>
                <td className="px-4 py-2 text-center">{usuario.senha}</td>
                <td className="px-4 py-2 text-center">{usuario.status}</td>
                <td className="px-4 py-2 text-center">
                  <button
                    onClick={() => openEditModal(usuario)}
                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => {
                      if (
                        window.confirm(
                          "Deseja realmente excluir este usuário?"
                        )
                      ) {
                        excluirUsuario(usuario.id);
                      }
                    }}
                    className="ml-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de Edição */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Editar Usuário</h2>
            <div className="mb-4">
              <label htmlFor="nome" className="block text-gray-700 mb-2">
                Nome
              </label>
              <input
                type="text"
                id="nome"
                name="nome"
                value={usuarioEdit?.nome || ""}
                onChange={handleEdit}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="ramal" className="block text-gray-700 mb-2">
                Ramal
              </label>
              <input
                type="text"
                id="ramal"
                name="ramal"
                value={usuarioEdit?.ramal || ""}
                onChange={handleEdit}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="senha" className="block text-gray-700 mb-2">
                Senha
              </label>
              <input
                type="password"
                id="senha"
                name="senha"
                value={usuarioEdit?.senha || ""}
                onChange={handleEdit}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="status" className="block text-gray-700 mb-2">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={usuarioEdit?.status || "Ativo"}
                onChange={handleEdit}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="Ativo">Ativo</option>
                <option value="Inativo">Inativo</option>
              </select>
            </div>
            <div className="flex justify-end gap-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                onClick={saveChanges}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Usuarios;
