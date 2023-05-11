import nextConnect from "next-connect";

const multer = require("multer");
const path = require("path");

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(process.cwd(), "public/userPostImage"));
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
    },
  }),
});

export default nextConnect({
  onError(error, req, res) {
    res
      .status(500)
      .json({ error: `Sorry something happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(404).json({ error: `Method ${req.method} Not allowed!` });
  },
}).use(upload.single("myImage"));
