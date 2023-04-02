const express = require("express");

const app = express();
const port = 3001;

var cors = require("cors");
require("./mongodb");

const User = require("../models/users");

app.use(express.json());
app.use(cors());

app.post("/api/requests/login", async function (req, res) {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    age: req.body.age,
  });
  console.log(user);
  try {
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
  //   try {
  //     const user = await User.findByCredentials(
  //       req.body.email,
  //       req.body.password
  //     );
  // const token = await user.generateAuthToken();

  // const serialized = serialize("CookieJWT", token, {
  //   httpOnly: true,
  //   sameSite: "strict",
  //   maxAge: 60 * 60 * 24 * 7,
  //   path: "/",
  // });

  // res.setHeader("Set-Cookie", serialized);
  // res.status(201).send({ user, token }, "Success~!!!");
  //     console.log("user======", user);
  //     res.status(201).send({ user }, "Success~!!!");
  //   } catch (e) {
  //     res.status(401).send(e);
  //     console.log(e, "Not logged in!");
  //   }
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
