import connectMongoose from "../../../utils/connectMongoose";
import { serialize } from "cookie";

import User from "../../../models/users";

export default async function login(req, res) {
  await connectMongoose();
  console.log(req.body);
  //   const parsedData = JSON.parse(req.body);
  //   console.log('parsedData', parsedData);
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();

    const serialized = serialize("CookieJWT", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    res.setHeader("Set-Cookie", serialized);
    
    res.status(201).json({ user, token }, "Success~!!!");
  } catch (e) {
    res.json({ error: e });
    console.log("Not logged in!");
  }
}
