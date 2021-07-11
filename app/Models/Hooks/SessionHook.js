"use strict";

const SessionHook = (exports = module.exports = {});

const { uuid } = require("uuidv4");

SessionHook.uuid = async (session) => {
  session.session_id = uuid();
};
