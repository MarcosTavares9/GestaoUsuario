import type { HttpContext } from '@adonisjs/core/http'
import NovosUsuario from '#models/novos_usuario'

export default class NovosUsuariosController {
  /**
   * Exibe uma lista de recursos
   */
  public async index({ response }: HttpContext) {
    try {
      const novosusuarios = await NovosUsuario.all()
      return response.status(200).json(novosusuarios)
    } catch (error) {
      return response.status(500).json({ message: 'Erro ao buscar usuários', error })
    }
  }

  /**
   * Processa a criação de um novo recurso
   */
  public async store({ request, response }: HttpContext) {
    try {
      const data = request.only(['nome', 'ramal', 'senha', 'status'])
      const novosusuarios = await NovosUsuario.create(data)
      return response.status(201).json(novosusuarios)
    } catch (error) {
      return response.status(500).json({ message: 'Erro ao criar usuário', error })
    }
  }

  /**
   * Exibe um recurso específico
   */
  public async show({ params, response }: HttpContext) {
    try {
      const novosusuarios = await NovosUsuario.findOrFail(params.id)
      return response.status(200).json(novosusuarios)
    } catch (error) {
      return response.status(404).json({ message: 'Usuário não encontrado', error })
    }
  }

  /**
   * Processa a atualização de um recurso específico
   */
  public async update({ params, request, response }: HttpContext) {
    try {
      const novosusuarios = await NovosUsuario.findOrFail(params.id)
      const data = request.only(['nome', 'ramal', 'senha', 'status'])
      novosusuarios.merge(data)
      await novosusuarios.save()
      return response.status(200).json(novosusuarios)
    } catch (error) {
      return response.status(404).json({ message: 'Usuário não encontrado', error })
    }
  }

  /**
   * Exclui um recurso específico
   */
  public async destroy({ params, response }: HttpContext) {
    try {
      const novosusuarios = await NovosUsuario.findOrFail(params.id)
      await novosusuarios.delete()
      return response.status(204).send()
    } catch (error) {
      return response.status(404).json({ message: 'Usuário não encontrado', error })
    }
  }
}