/**
 * Create table `contacts`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function up(knex) {
  return knex.schema.createTable('contacts', (table) => {
    table.increments();
    table.timestamp('created_at').notNull().defaultTo(knex.raw('now()'));
    table.timestamp('updated_at').notNull().defaultTo(knex.raw('now()'));
    table.string('name').notNull();
    table.integer('photograph');
    table.string('email');
    table.string('address');
    table.boolean('favourite').notNull().defaultTo(false);
    table.json('phone').notNull();
    table.integer('user_id').unsigned().notNull().references('id').inTable('users');
  });
}

/**
 * Drop `contacts`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function down(knex) {
  return knex.schema.dropTable('contacts');
}
