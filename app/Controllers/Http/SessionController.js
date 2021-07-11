"use strict";

const Session = use("App/Models/Session");

class SessionController {
  async create({ response }) {
    let created = false;
    let tries = 0;
    let session;
    while (!created && tries < 10) {
      try {
        tries++;
        session = await Session.create();
        created = true;
      } catch (error) {}
    }
    if (tries > 9) {
      return response.status(500);
    }
    return session;
  }

  async exists({ request, response }) {
    const { session_id } = request.all();
    await Session.findOrFail(session_id)
      .then(() => {
        return response.status(200).send({ exists: true });
      })
      .catch((error) => {
        response.status(404).send({ exists: true });
      });
  }
}

module.exports = SessionController;
