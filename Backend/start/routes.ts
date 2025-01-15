import router from '@adonisjs/core/services/router'
const UsuariosController = () => import('#controllers/usuarios_controller')
router.get('usuarios', [UsuariosController, 'index']) // Listar todos os usuários
router.post('usuarios', [UsuariosController, 'store']) // Criar um novo usuário
router.get('usuarios/:id', [UsuariosController, 'show']) // Mostrar um usuário específico
router.put('usuarios/:id', [UsuariosController, 'update']) // Atualizar um usuário
router.delete('usuarios/:id', [UsuariosController, 'destroy']) // Excluir um usuário

const NovosUsuariosController = () => import('#controllers/novos_usuarios_controller')
router.get('novosusuarios', [NovosUsuariosController, 'index']) // Listar todos os usuários
router.post('novosusuarios', [NovosUsuariosController, 'store']) // Criar um novo usuário
router.get('novosusuarios/:id', [NovosUsuariosController, 'show']) // Mostrar um usuário específico
router.get('novosusuarios/:status', [NovosUsuariosController, 'show']) // Mostrar um usuário específico
router.put('novosusuarios/:id', [NovosUsuariosController, 'update']) // Atualizar um usuário
router.delete('novosusuarios/:id', [NovosUsuariosController, 'destroy']) // Excluir um usuário
