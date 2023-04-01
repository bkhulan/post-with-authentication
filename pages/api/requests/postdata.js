import connectMongoose from "../../../utils/connectMongoose";
import jwt from "jsonwebtoken";

import middlewareHandler from "../../../middlewareFolder/middlewareHandler";
import Post from "../../../models/posts";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default middlewareHandler.post(async (req, res, next) => {
  await connectMongoose();
  console.log("Connected to the database (upload)!");

  const jwtCookie = req.cookies.CookieJWT;
  const claims = jwt.verify(jwtCookie, process.env.SECRET);

  // const ObjectReqBody = JSON.parse(req.body);
  // console.log("ObjectReqBody", ObjectReqBody);

  try {
    const post = new Post({
      title: req.body.title,
      myImage: req.file.filename,
      description: req.body.description,
      userId: claims._id,
    });
    
    console.log('POST ====', post);
    
    const savePost = await post.save();
    res.status(200).send(savePost);
    
  } catch (e) {
    console.log(e, "Error is occured!");
    
    res.status(500).send(e);
  }
});
