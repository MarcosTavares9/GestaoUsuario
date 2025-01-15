import type { HttpContext } from '@adonisjs/core/http'
import Usuario from '#models/usuario'

export default class UsuariosController {
  /**
   * Exibe uma lista de recursos
   */
  async login({ request, response }) {
    const { email, senha } = request.only(['email', 'senha'])

    // Busca o usuário pelo email
    const usuario = await Usuario.findBy('email', email)

    if (!usuario) {
      return response.status(404).json({ message: 'Usuário não encontrado.' })
    }

    // Verifica a senha (assumindo que você está armazenando senhas em texto plano, o que não é recomendado para produção)
    if (usuario.senha !== senha) {
      return response.status(400).json({ message: 'Senha incorreta.' })
    }

    return response.status(200).json({ message: 'Login bem-sucedido.', usuario })
  }
  public async index({ response }: HttpContext) {
    try {
      const usuarios = await Usuario.all()
      return response.status(200).json(usuarios)
    } catch (error) {
      return response.status(500).json({ message: 'Erro ao buscar usuários', error })
    }
  }

  /**
   * Processa a criação de um novo recurso
   */
  public async store({ request, response }: HttpContext) {
    try {
      const data = request.only(['nome', 'email', 'senha'])
      const usuario = await Usuario.create(data)
      return response.status(201).json(usuario)
    } catch (error) {
      return response.status(500).json({ message: 'Erro ao criar usuário', error })
    }
  }

  /**
   * Exibe um recurso específico
   */
  public async show({ params, response }: HttpContext) {
    try {
      const usuario = await Usuario.findOrFail(params.id)
      return response.status(200).json(usuario)
    } catch (error) {
      return response.status(404).json({ message: 'Usuário não encontrado', error })
    }
  }

  /**
   * Processa a atualização de um recurso específico
   */
  public async update({ params, request, response }: HttpContext) {
    try {
      const usuario = await Usuario.findOrFail(params.id)
      const data = request.only(['nome', 'email', 'senha'])
      usuario.merge(data)
      await usuario.save()
      return response.status(200).json(usuario)
    } catch (error) {
      return response.status(404).json({ message: 'Usuário não encontrado', error })
    }
  }

  /**
   * Exclui um recurso específico
   */
  public async destroy({ params, response }: HttpContext) {
    try {
      const usuario = await Usuario.findOrFail(params.id)
      await usuario.delete()
      return response.status(204).send()
    } catch (error) {
      return response.status(404).json({ message: 'Usuário não encontrado', error })
    }
  }
}
