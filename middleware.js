import { NextResponse } from "next/server";
import { jwtVerify, SignJWT } from "jose";

const SECRET = process.env.SECRET;

export async function middleware(req) {
  console.log("Middleware file.");
  const { cookies } = req;

  const jwt = cookies.get("CookieJWT")?.value;
  console.log("JWT === ", jwt);

  if (req.nextUrl.pathname.startsWith("/protectedroute")) {
    if (jwt === undefined) {
      return NextResponse.redirect("http://localhost:3000/login");
    }

    try {
      await jwtVerify(jwt, new TextEncoder().encode(SECRET));
      return NextResponse.next();
    } catch (e) {
      return NextResponse.redirect("http://localhost:3000/login");
    }
  }

  // const url = req.url;
  // console.log("url", url);
  // if (url.includes("/dashboard")) {
  //   if (jwt === undefined) {
  //     return NextResponse.redirect("http://localhost:3000/login");
  //   }

  //   try {
  //     verify(jwt, SECRET);
  //     return NextResponse.next();
  //   } catch (e) {
  //     return NextResponse.redirect("http://localhost:3000/login");
  //   }
  // }

  return NextResponse.next();
}

export const config = {
  matcher: "/protectedroute/post",
};