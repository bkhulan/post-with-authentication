import User from "../../../models/users";
import connectMongoose from "../../../utils/connectMongoose";

export default async function addUser(req, res) {
  await connectMongoose();
  console.log("Connected to the database!");
  console.log("req.body ===== ", req.body);
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).send({ user });
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
}
