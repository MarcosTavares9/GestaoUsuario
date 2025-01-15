import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Usuario extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nome: string

  @column()
  declare email: string

  @column()
  declare senha: string
}