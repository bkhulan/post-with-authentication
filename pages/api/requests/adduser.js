import connectMongoose from "../../../utils/connectMongoose";
import User from "../../../models/users";

export default async function addUser(req, res) {
  await connectMongoose();
  console.log("Connected to the database!");

  const duplicated = await User.findOne({ email: req.body.email });

  if (duplicated) {
    return res.status(422).send("There is already an account with this email.");
  }

  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send({ user });
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
}
