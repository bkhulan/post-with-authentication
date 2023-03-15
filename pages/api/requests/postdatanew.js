import HttpStatus from "http-status-codes";
import nextConnect from "next-connect";
import formidable from "formidable";

import middleware from "../../../middleware/middleware";

const handler = nextConnect();

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

handler.use(middleware);

handler.post(async (req, res) => {
  try {
    console.log("req.body =====", req.body);
    console.log("req.headers ======", req.headers);
    console.log("req.headers.contentType ===== ", req.headers["content-type"]);

    res.status(200).send({ status: "Success." });
  } catch (err) {
    res.status(500).send(err);
  }
});

export default handler;
