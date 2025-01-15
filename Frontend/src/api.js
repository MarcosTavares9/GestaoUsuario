import axios from "axios";

export const novosUsuariosApi = axios.create({
  baseURL: "http://localhost:3333/novosusuarios",
});

export const usuariosApi = axios.create({
  baseURL: "http://localhost:3333/usuarios",
});
