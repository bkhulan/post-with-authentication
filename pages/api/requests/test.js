// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

export default function handler(req, res) {
  console.log("req.body", req.body);
  const data = req.body;
  res.status(200).json(data, 'Successfully got the data.');
}
