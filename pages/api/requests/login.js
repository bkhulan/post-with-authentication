import connectMongoose from "../../../utils/connectMongoose";

import User from "../../../models/users";

export default async function login(req, res) {
  await connectMongoose();

  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.status(201).json({ user, token });
    console.log(user, token, "Successfully logged in!");
  } catch (e) {
    res.json({ error: e });
    console.log("Not logged in!");
  }
}
