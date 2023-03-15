import nextConnect from "next-connect";
import multipartFormParser from "./multipart-form-parser";

const multer = require("multer");
const path = require("path");
// const bodyParser = require("body-parser");

// const upload = multer({
//   storage: multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, path.join(process.cwd(), "uploads"));
//     },
//     filename: (req, file, cb) => {
//       cb(null, Date.now() + "-" + file.originalname);
//     },
//   }),
// });

const middleware = nextConnect({
  onError(error, req, res) {
    res
      .status(500)
      .json({ error: `Sorry something happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(404).json({ error: `Method ${req.method} Not allowed!` });
  },
});

middleware.use(multipartFormParser);
// middleware.use(
//   bodyParser.urlencoded({
//     extended: true,
//   })
// );

// const uploadMiddleware = upload.array("myImage");
// middleware.use(uploadMiddleware);

export default middleware;
