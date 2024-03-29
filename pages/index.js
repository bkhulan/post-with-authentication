import { useEffect } from 'react'
import { useRouter } from "next/router";

import Head from "next/head";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
   router.push('/login');
  }, [])

  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>
    </div>
  );
}