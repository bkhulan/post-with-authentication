import { useEffect } from "react";
import { useRouter } from "next/router";

import Head from "next/head";

export default function ProtectedRouteHome() {
  const router = useRouter();

  useEffect(() => {
    router.push("/protectedroute/home");
  }, []);

  return (
    <div>
      <Head>
        <title>Protected route home</title>
      </Head>
    </div>
  );
}
