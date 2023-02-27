// import connectMongoose from "../../../utils/connectMongoose";
import User from "../../../models/users";

export default async function addTest(req, res) {
//   console.log("Connecting to mongo");
//   await connectMongoose();
//   console.log("Connected to mongo");

  const user = await User.create(req.body);
  res.json({ user });
}
