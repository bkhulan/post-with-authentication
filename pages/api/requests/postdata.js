import connectMongoose from "../../../utils/connectMongoose";
// import formidable from "formidable";
// import fs from "fs/promises";
// import path from "path";

import middlewareHandler from "../../../middleware/middlewareHandler";
import Post from "../../../models/posts";

export const config = {
  api: {
    bodyParser: false,
  },
};

// export const config = {
//   api: {
//     bodyParser: {
//       sizeLimit: "100mb",
//     },
//   },
// };

export default middlewareHandler.post(async (req, res, next) => {
  await connectMongoose();
  console.log("Connected to the database (upload)!");
  // console.log("req.headers.contentType ===== ", req.headers['content-type']);
  console.log("req.body ===== ", req.body);
  console.log("req.file ===== ", req.file);
  
  // const ObjectReqBody = JSON.parse(req.body);
  // console.log("ObjectReqBody", ObjectReqBody);

  try {
    const post = new Post({
      title: req.body.title,
      myImage: req.file.path,
      description: req.body.description,
    });

    console.log("Post data ===== ", post);
    const savePost = await post.save();

    res.status(200).send(savePost);
  } catch (e) {
    console.log(e, "Error is occured!");
    res.status(500).send(e);
  }
});
