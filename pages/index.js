import Head from "next/head";
import Link from "next/link";

import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.mainContainer}>
      <Head>
        <title>Home</title>
      </Head>

      <div className={styles.subContainer}>
        <div className={styles.subButton}>
          <Link href="/login" className={styles.button}>
            Log in
          </Link>

          <Link href="/signup" className={styles.button}>
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}

Home.getLayout = function PageLayout(page) {
  return <>{page}</>;
};
