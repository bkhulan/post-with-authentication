import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";

import styles from "../styles/Home.module.css";

function Signup() {
  const router = useRouter();

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

    async function signUpButtonFunc() {
      try {
        const res = await axios.post(
          "http://localhost:3000/api/requests/adduser",
          {
            name,
            email,
            password,
            age,
          }
        );

        console.log("Client response ===== ", res);
        if (res.status === 201) {
          router.push("/protectedroute/post");
        } else {
          console.log("Incorrect email or password!!!");
        }
      } catch (e) {
        console.log("Signup is not working!");
      }
    }

    signUpButtonFunc();
    // setName('');
    // setEmail('');
    // setPassword('');
    // setAgeName('');
  };

  return (
    <div className={styles.mainContainer}>
      <form onSubmit={buttonHandler} className={styles.subContainer}>
        <div className={styles.subInputStyle}>
          <input
            type="text"
            placeholder="Name"
            className={styles.loginSignupInput}
            onChange={nameHandler}
            value={name}
          />
        </div>
        <div className={styles.subInputStyle}>
          <input
            type="email"
            placeholder="Email"
            className={styles.loginSignupInput}
            onChange={emailHandler}
            value={email}
          />
        </div>
        <div className={styles.subInputStyle}>
          <input
            type="password"
            placeholder="Password"
            className={styles.loginSignupInput}
            onChange={passwordHandler}
            value={password}
          />
        </div>
        <div className={styles.subInputStyle}>
          <input
            type="number"
            placeholder="Age"
            className={styles.loginSignupInput}
            onChange={ageHandler}
            value={age}
          />
        </div>
        <div className={styles.subButton}>
          <button className={styles.button}>Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
