import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class NovosUsuario extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nome: string

  @column()
  declare ramal: string

  @column()
  declare senha: string

  @column()
  declare status: string
}
