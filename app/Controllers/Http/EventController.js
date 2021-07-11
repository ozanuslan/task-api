"use strict";

const Event = use("App/Models/Event");
const User = use("App/Models/User");

class EventController {
  async insert({ request, response }) {
    const events = request.input("events");
    const n_event = await Event.createMany(events).catch((error) => {
      return response.status(400).send(error);
    });

    return { n_event };
  }

  async getAll() {
    const data = await Event.all();
    return { data };
  }

  async update({ request, auth, response }) {
    const { email, password, session_id } = request.all();
    await auth.attempt(email, password).catch((error) => {
      return response.status(401).send("User couldn't be authenticated.");
    });
    const user = await User.query().where("email", email).first();
    await Event.query()
      .where("session_id", session_id)
      .update({ email: email, user_id: user.id });
    return { success: true };
  }
}

module.exports = EventController;
