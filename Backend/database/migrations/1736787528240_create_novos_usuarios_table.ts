import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'novos_usuarios'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nome', 80).nullable()
      table.string('ramal', 254).notNullable().unique()
      table.string('senha', 80).notNullable()
      table.string('status').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}