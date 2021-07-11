"use strict";

const Event = use("App/Models/Event");
const Session = use("App/Models/Session");

class EventController {
  async insert({ request, response }) {
    const events = request.input("events");
    try {
      await Session.find(events[0].session_id);
    } catch (error) {
      return response.status(400).send("Session id invalid.");
    }
    const n_event = await Event.createMany(events).catch((error) => {
      return response.status(400).send(error);
    });

    return { events: n_event };
  }

  async getAll() {
    const events = await Event.all();
    return { events };
  }

  async update({ request, auth, response }) {
    const { email, password, session_id } = request.all();
    try {
      await auth.attempt(email, password);
    } catch (error) {
      return response.status(401).send({ message: error, success: false });
    }
    if ((await Session.find(session_id)) === null)
      return response
        .status(400)
        .send({ message: "Invalid session id", success: false });

    await Event.query()
      .where("session_id", session_id)
      .update({ email: email });
    return { message: "Sessions updated successfully.", success: true };
  }
}

module.exports = EventController;
