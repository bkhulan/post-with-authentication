import mongoose from "mongoose";

mongoose.set("strictQuery", false);
const connectMongoose = async () => mongoose.connect(process.env.MONGO_URI, () => {
    console.log('Connected to the database.')
});

export default connectMongoose;
