import Link from "next/link";

import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.mainNav}>
        <Link href="/login/allData">
          <a className={styles.navText}>All data</a>
        </Link>
      </div>
      <div className={styles.subContainer}>
        <Link href="/login">
          <a className={styles.button}>Log in</a>
        </Link>
        <Link href="/signup">
          <a className={styles.button}>Sign up</a>
        </Link>
      </div>
    </div>
  );
}
