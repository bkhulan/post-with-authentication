import Link from "next/link";

import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.subContainer}>
        <Link href="/login">
          <a className={styles.button}>Log in</a>
        </Link>
        <br />
        <Link href="/Signup">
          <a className={styles.button}>Sign up</a>
        </Link>
      </div>
    </div>
  );
}
