"use strict";

const Event = use("App/Models/Event");
const { uuid } = require("uuidv4");

class EventController {
  async insert({ request, response }) {
    let { session_id, user_id, email, event } = request.only([
      "session_id",
      "user_id",
      "email",
      "event",
    ]);
    if (session_id === undefined)
      return response.status(400).send("session_id cannot be empty");
    if (event === undefined)
      return response.status(400).send("event cannot be empty");
    if (user_id === undefined) user_id = 0;
    if (!uuid.validate(session_id))
      return response.status(400).send("session_id invalid");

    const n_event = await Event.create({ user_id, session_id, email, event });

    // console.log(n_event);

    return { n_event };
  }
}

module.exports = EventController;
