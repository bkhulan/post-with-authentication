import Head from "next/head";

import { useSession, getSession } from "next-auth/react";

import styles from "./home.module.css";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>

      {session ? User({ session }) : ""}
    </div>
  );
}

function User({ session }) {
  return (
    <main className={styles.mainContainer}>
      <h1>User Home</h1>
      <p>{session.user.name}</p>
      <p>{session.user.email}</p>
    </main>
  );
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
