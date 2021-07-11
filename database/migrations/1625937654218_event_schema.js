"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class EventSchema extends Schema {
  up() {
    this.create("events", (table) => {
      table.increments();
      table.uuid("session_id");
      table.integer("user_id").unsigned();
      table.string("email", 254);
      table.string("event", 254).notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("events");
  }
}

module.exports = EventSchema;
