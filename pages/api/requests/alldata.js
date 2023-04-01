import connectMongoose from "../../../utils/connectMongoose";

import Post from "../../../models/posts";

export default async function AllData(req, res) {
  await connectMongoose();
  console.log("Connected to the database!");
  try {
    const posts = await Post.find({});
    res.send(posts);
  } catch (e) {
    res.status(500).send();
  }
}
