import connectMongoose from "../../../utils/connectMongoose";
import User from "../../../models/users";

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

export default async function Profile(req, res) {
  // console.log('profile====', req.cookies);

  await connectMongoose();
  console.log("Connected to the database!");
}
