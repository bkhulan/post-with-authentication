import React, { useState } from "react";
import Link from "next/link";

import styles from "../styles/Home.module.css";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAgeName] = useState("");

  const nameHandler = (e) => {
    setName(e.target.value);
  };
  const emailHandler = (e) => {
    setEmail(e.target.value);
  };
  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const ageHandler = (e) => {
    setAgeName(e.target.value);
  };

  const buttonHandler = (e) => {
    e.preventDefault();
    if (
      name.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      age.trim() === ""
    ) {
      return console.log("Enter values!!!");
    } else {
      console.log(name.trim());
      console.log(email.trim());
      console.log(password.trim());
      console.log(age.trim());
    }

    // setName('');
    // setEmail('');
    // setPassword('');
    // setAgeName('');
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.mainNav}>
        <Link href="/">
          <a className={styles.navText}>Home</a>
        </Link>
        <Link href="/login/allData">
          <a className={styles.navText}>All Data</a>
        </Link>
        <Link href="/">
          <a className={styles.navText}>Log in</a>
        </Link>
      </div>
      <form onSubmit={buttonHandler} className={styles.subContainer}>
        <input
          type="text"
          placeholder="Name"
          className={styles.loginUserInput}
          onChange={nameHandler}
          value={name}
        />
        <input
          type="email"
          placeholder="Email"
          className={styles.loginUserInput}
          onChange={emailHandler}
          value={email}
        />
        <input
          type="password"
          placeholder="Password"
          className={styles.loginUserInput}
          onChange={passwordHandler}
          value={password}
        />
        <input
          type="number"
          placeholder="Age"
          className={styles.loginUserInput}
          onChange={ageHandler}
          value={age}
        />
        <button className={styles.button}>Submit</button>
      </form>
    </div>
  );
}

export default Signup;
