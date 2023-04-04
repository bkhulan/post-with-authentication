import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";

import styles from "../styles/Home.module.css";

function Signup() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [age, setAgeName] = useState("");

  const [emailValid, setEmailValid] = useState(true);
  const [agePositive, setAgePositive] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [confirmePasswordError, setConfirmPasswordError] = useState(false);

  const nameHandler = (e) => {
    setName(e.target.value);
  };
  const emailHandler = (e) => {
    setEmail(e.target.value);
  };
  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };
  const confirmPasswordHandler = (e) => {
    setConfirmPassword(e.target.value);
  };

  const ageHandler = (e) => {
    setAgeName(e.target.value);
  };

  const buttonHandler = (e) => {
    e.preventDefault();

    if (email.includes(".com")) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
      return;
    }

    if (password.length < 7) {
      setPasswordValid(false);
      return;
    } else {
      setPasswordValid(true);
    }

    if (password === confirmPassword) {
      setConfirmPasswordError(false);
    } else {
      setConfirmPasswordError(true);
      return;
    }

    if (age < 0) {
      setAgePositive(false);
      return;
    } else {
      setAgePositive(true);
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
        console.log(name.trim());
        console.log(email.trim());
        console.log(password.trim());
        console.log(age.trim());
        if (res.status === 201) {
          router.push("/login");
        } else {
          console.log("Incorrect email or password!!!");
        }
      } catch (e) {
        console.log("Signup is not working!");
      }
    }

    signUpButtonFunc();
  };

  return (
    <div className={styles.mainContainer}>
      <Head>
        <title>Signup</title>
      </Head>
      <form onSubmit={buttonHandler} className={styles.subContainer}>
        <div className={styles.subInputStyle}>
          <input
            type="text"
            placeholder="Name"
            className={styles.loginSignupInput}
            onChange={nameHandler}
            value={name}
            required
          />
        </div>
        <div className={styles.subInputStyle}>
          <input
            type="email"
            placeholder="Email"
            className={styles.loginSignupInput}
            onChange={emailHandler}
            value={email}
            required
          />
        </div>
        <div className={styles.subInputStyle}>
          <input
            type="password"
            placeholder="Password"
            className={styles.loginSignupInput}
            onChange={passwordHandler}
            value={password}
            required
          />
        </div>
        <div className={styles.subInputStyle}>
          <input
            type="password"
            placeholder="Confirm password"
            className={styles.loginSignupInput}
            onChange={confirmPasswordHandler}
            value={confirmPassword}
            required
          />
        </div>
        <div className={styles.subInputStyle}>
          <input
            type="number"
            placeholder="Age"
            className={styles.loginSignupInput}
            onChange={ageHandler}
            value={age}
            required
          />
        </div>
        {!agePositive && (
          <p className={styles.errorParagraph}>
            Age must be a positive number!
          </p>
        )}
        {!emailValid && <p className={styles.errorParagraph}>Invalid email!</p>}
        {confirmePasswordError && (
          <p className={styles.errorParagraph}>Passwords don't match!</p>
        )}
        {!passwordValid && (
          <p className={styles.errorParagraph}>
            Password must be at least 7 characters.
          </p>
        )}
        <div className={styles.subButton}>
          <button className={styles.button}>Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Signup;

Signup.getLayout = function PageLayout(page) {
  return <>{page}</>;
};
