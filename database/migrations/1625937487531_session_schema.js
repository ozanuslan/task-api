"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class SessionSchema extends Schema {
  up() {
    this.create("sessions", (table) => {
      table.uuid("session_id").primary();
      table.timestamps();
    });
  }

  down() {
    this.drop("sessions");
  }
}

module.exports = SessionSchema;
