import connectMongoose from "../../../utils/connectMongoose";
import { serialize } from "cookie";

import User from "../../../models/users";

export default async function addUser(req, res) {
  await connectMongoose();
  console.log("Connected to the database!");
  console.log("req.body ===== ", req.body);
  const user = new User(req.body);

  try {
    await user.save();

    const token = await user.generateAuthToken();

    const serialized = serialize("CookieJWT", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    res.setHeader("Set-Cookie", serialized);
    res.status(201).send({ user, token });
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
}
