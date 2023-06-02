import { withAuth } from "next-auth/middleware";

// import { NextResponse } from "next/server";
// import { jwtVerify } from "jose";

export default withAuth(async function middleware(req) {
  console.log("Middleware file.");
});
  
export const config = {
  matcher: "/protectedroute/:path*",
}

// Iim baij boloh =================================================================================

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

// ===============================================================================================


//   const { cookies } = req;
  //   const jwt = cookies.get("CookieJWT")?.value;
  //   if (req.nextUrl.pathname.startsWith("/protectedroute")) {
  //     if (jwt === undefined) {
  //       return NextResponse.redirect("http://localhost:3000/login");
  //     }
  //     try {
  //       await jwtVerify(jwt, new TextEncoder().encode(SECRET));
  //       return NextResponse.next();
  //     } catch (e) {
  //       return NextResponse.redirect("http://localhost:3000/login");
  //     }
  //   }
  // return NextResponse.next();