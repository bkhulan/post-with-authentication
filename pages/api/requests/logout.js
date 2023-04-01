import { serialize } from "cookie";

export default async function logout(req, res) {
  const { cookies } = req;

  const jwt = cookies.CookieJWT;

  if (!jwt) {
    return res.json({ message: "You are already not logged in!" });
  } else {
    const serialized = serialize("CookieJWT", null, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: -1,
      path: "/",
    });

    res.setHeader("Set-Cookie", serialized);
    res.status(200).json({ message: "Successfully logged out!" });
  }
}
