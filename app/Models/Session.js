"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Session extends Model {
  static boot() {
    super.boot();
    this.addHook("beforeCreate", "SessionHook.uuid");
  }

  static get primaryKey() {
    return "session_id";
  }

  static get incrementing() {
    return false;
  }
}

module.exports = Session;
