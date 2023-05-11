import Head from "next/head";

import styles from "./home.module.css"

export default function Home() {
  return (
    <div>
      <Head>
        <title>Protected Route Home</title>
      </Head>
      <main className={styles.mainContainer}>Hello</main>
    </div>
  );
}
