import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'usuarios'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nome').nullable()
      table.string('email', 254).notNullable().unique()
      table.string('senha').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}