import connectMongoose from "../../../utils/connectMongoose";

import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

import middlewareHandler from "../../../middlewareFolder/middlewareHandler";
import User from "../../../models/users";
import Post from "../../../models/posts";

// import jwt from "jsonwebtoken";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default middlewareHandler.post(async (req, res, next) => {
  await connectMongoose();
  console.log("Connected to the database (upload)!");

  const session = await getServerSession(req, res, authOptions);

  const user = await User.findOne({ email: session.user.email });

  // const jwtCookie = req.cookies.CookieJWT;
  // const claims = jwt.verify(jwtCookie, process.env.SECRET);
  // const ObjectReqBody = JSON.parse(req.body);
  // console.log("ObjectReqBody", ObjectReqBody);

  try {
    const post = new Post({
      title: req.body.title,
      myImage: req.file.filename,
      description: req.body.description,
      userId: user._id,
    });
    const savePost = await post.save();
    res.status(200).send(savePost);
  } catch (e) {
    console.log("Error is occured in postdata! ============= ", e);
    res.status(500).send(e);
  }
});
