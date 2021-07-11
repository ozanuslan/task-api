"use strict";

const User = use("App/Models/User");

class UserController {
  async login({ request, auth, response }) {
    const { email, password } = request.all();
    try {
      const token = await auth.attempt(email, password);
      return token;
    } catch (error) {
      return response.status(401).send("User couldn't be authenticated.");
    }
  }

  async register({ request, response }) {
    const { email, password } = request.all();
    try {
      await User.create({ email, password });
    } catch (error) {
      return response.status(409).send("User with same email already exists.");
    }
    return this.login(...arguments);
  }
}

module.exports = UserController;
