import mongoose from "mongoose";

mongoose.set("strictQuery", false);

const connectMongoose = async () => mongoose.connect(process.env.MONGO_URI);
  

// const connectMongoose = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
//     console.log("Connected to the database!");
//   } catch (e) {
//     console.log(e);
//   }
// };

// const connectMongoose = async () =>
//   mongoose
//     .connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//     })
//     .then(() => {
//       console.log("Connected to the database!");
//     })
//     .catch((e) => {
//       console.log(e);
//     });

require("../models/users");

export default connectMongoose;
