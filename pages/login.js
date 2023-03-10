import { useState } from "react";
import Head from "next/head";
import Link from "next/link";

import styles from "../styles/Home.module.css";

export default function Home(req, res) {
  const [userEmail, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userEmailHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const buttonHandler = async (e) => {
    e.preventDefault();
    if (userEmail.trim() === "" || password.trim() === "") {
      return console.log("Enter values!!!");
    } else {
      console.log(userEmail.trim());
      console.log(password.trim());
    }
  };

  return (
    <div className={styles.mainContainer}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.mainNav}>
        <Link href="/">
          <a className={styles.navText}>Home</a>
        </Link>
        <Link href="/signup">
          <a className={styles.navText}>Sign up</a>
        </Link>
        <Link href="/login/allData">
          <a className={styles.navText}>All Data</a>
        </Link>
      </div>

      <main>
        <form onSubmit={buttonHandler} className={styles.subContainer}>
          <input
            type="email"
            placeholder="Email"
            className={styles.loginUserInput}
            onChange={userEmailHandler}
            value={userEmail}
          />
          <input
            type="password"
            placeholder="Password"
            className={styles.loginUserInput}
            onChange={passwordHandler}
            value={password}
          />
          <div>
            <button className={styles.button}>Log in</button>
          </div>
        </form>
      </main>
    </div>
  );
}
