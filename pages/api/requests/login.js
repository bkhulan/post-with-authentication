// import connectMongoose from "../../../utils/connectMongoose";
// import { serialize } from "cookie";

// import User from "../../../models/users";

// export default async function login(req, res) {
//   await connectMongoose();

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
    
//     res.status(201).send({ user }, "Success~!!!");

//   } catch (error) {

//     if (error.toString() === "Error: Email is not registered!") {
//       res.status(401).send("Email is not registered!");
//     } else if (error.toString() === "Error: Password incorrect!") {
//       res.status(401).send("Password incorrect!");
//     } else {
//       res.status(401).send(error, "Not logged in!");
//     }
//   }
// }
