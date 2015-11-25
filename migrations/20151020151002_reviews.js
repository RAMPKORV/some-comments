'use strict'

exports.up = function(knex) {
  return knex.schema.createTable('reviews', function(table) {
    table.increments()
    table.integer('grade').notNullable()

    table.integer('userId')
    table.integer('pageId')
    table.integer('commentId')

    table.timestamp('createdAt').defaultTo(knex.raw('CURRENT_TIMESTAMP'))
    table.timestamp('modifiedAt').defaultTo(knex.raw('CURRENT_TIMESTAMP'))
    table.timestamp('deletedAt')
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('reviews')
}
