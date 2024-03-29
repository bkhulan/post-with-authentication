const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    myImage: {
      type: String,
    },
    description: {
      type: String,
      required: true,
      // trim: true,
    },
    userId: {
      type: ObjectId,
      required: true,
    },
  },
  { timestamps: true }
  //   { typeKey: "$type" }
);

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);

module.exports = Post;
