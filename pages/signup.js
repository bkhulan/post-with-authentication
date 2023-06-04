import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";

import { MdCheckCircle } from "react-icons/md";

import BirthDateSelect from "../components/BirthDateSelect";
import styles from "../styles/Home.module.css";

export default function Signup() {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [userBirthday, setUserBirthday] = useState("");

  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [confirmePasswordError, setConfirmPasswordError] = useState(false);
  const [duplicateEmail, setDuplicateEmail] = useState(null);
  const [invalidBirthday, setInvalidBirthday] = useState(false);
  const [successfulPost, setSuccessfulPost] = useState(false);

  function resetValidationErrors() {
    setEmailValid(true);
    setPasswordValid(true);
    setConfirmPasswordError(false);
    setDuplicateEmail(null);
    setInvalidBirthday(false);
  }

  const signupButtonHandler = async (e) => {
    e.preventDefault();

    resetValidationErrors();

    if (!email.includes(".com")) {
      setEmailValid(false);
      return;
    }

    if (password.length < 7) {
      setPasswordValid(false);
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError(true);
      return;
    }

    let today = new Date();

    const takeEachYMD = userBirthday.split("-");

    const takeEachDateValue = new Date(
      `${takeEachYMD[0]}-${takeEachYMD[1]}-${takeEachYMD[2]} EDT`
    );

    let msSince = today.getTime() - takeEachDateValue.getTime();
    let daysSince = Math.floor(msSince / (1000 * 60 * 60 * 24));
    let age = Math.floor(daysSince / 365);

    console.log("age ========= ", age);

    if (age < 16) {
      setInvalidBirthday(true);
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:3000/api/requests/adduser",
        {
          firstName,
          lastName,
          email,
          password,
          birthDate: userBirthday,
        }
      );

      console.log(firstName.trim());
      console.log(lastName.trim());
      console.log(email.trim());
      console.log(password.trim());

      if (res.status === 201) {
        setSuccessfulPost(true);
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    } catch (e) {
      if (e.response.status === 422) {
        setDuplicateEmail(e.response.data);
        return;
      } else {
        console.log(e);
        return;
      }
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Signup</title>
      </Head>
      <main className={styles.mainTagContainer}>
        <div className={`${styles.imageBackground}`}>
          <div className={`${styles.divImageSentence}`}>
            <h1>Hello, Friend!</h1>
            <p className={styles.pTagImageSentence}>
              Enter your personal details and start journey with us.
            </p>
          </div>
        </div>

        <div className={styles.mainFormContainer}>
          <form
            onSubmit={signupButtonHandler}
            className={`${styles.formContainer} ${styles.signupFormContainer}`}
          >
            <p
              className={`${styles.title} ${styles.signupTitle} ${styles.loginLogoutTitle}`}
            >
              Dream
            </p>
            <div className={styles.inputBox}>
              <input
                type="text"
                onChange={(e) => setFirstName(e.target.value)}
                className={`${styles.loginSignupInput} ${styles.signupInput}`}
                value={firstName}
                placeholder=" "
                required
              />
              <span className={styles.spanLoginSignupInput}>First name</span>
            </div>
            <div className={styles.inputBox}>
              <input
                type="text"
                onChange={(e) => setLastName(e.target.value)}
                className={`${styles.loginSignupInput} ${styles.signupInput}`}
                value={lastName}
                placeholder=" "
                required
              />
              <span className={styles.spanLoginSignupInput}>Last name</span>
            </div>
            <div className={styles.inputBox}>
              <input
                type="email"
                className={`${styles.loginSignupInput} ${styles.signupInput} ${
                  !emailValid || duplicateEmail ? styles.error : ""
                }`}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder=" "
                required
              />
              <span className={styles.spanLoginSignupInput}>Email</span>
            </div>
            <div className={styles.inputBox}>
              <input
                type="password"
                className={`${styles.loginSignupInput} ${styles.signupInput} ${
                  confirmePasswordError || !passwordValid ? styles.error : ""
                }`}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder=" "
                required
              />
              <span className={styles.spanLoginSignupInput}>Password</span>
            </div>
            <div className={styles.inputBox}>
              <input
                type="password"
                className={`${styles.loginSignupInput} ${styles.signupInput} ${
                  confirmePasswordError ? styles.error : ""
                }`}
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                placeholder=" "
                required
              />
              <span className={styles.spanLoginSignupInput}>
                Confirm password
              </span>
            </div>

            <BirthDateSelect
              setUserBirthday={setUserBirthday}
            />

            {!emailValid ? (
              <p className={styles.errorParagraph}>Invalid email!</p>
            ) : (
              ""
            )}

            {confirmePasswordError ? (
              <p className={styles.errorParagraph}>Passwords don't match!</p>
            ) : (
              ""
            )}

            {!passwordValid ? (
              <p className={styles.errorParagraph}>
                Password must be at least 7 characters.
              </p>
            ) : (
              ""
            )}

            {invalidBirthday ? (
              <p className={styles.errorParagraph}>Sorry, you're under 16!</p>
            ) : (
              ""
            )}

            {duplicateEmail && (
              <p className={styles.errorParagraph}>{duplicateEmail}</p>
            )}

            <button
              className={`${styles.allFourButtons} ${styles.loginSignupSubmiButton} ${styles.signupSubmitBtn}`}
            >
              Submit
            </button>
            <Link className={styles.loginSignupLinkButton} href="/login">
              Already have an account? Log in
            </Link>
          </form>
        </div>
      </main>
      <div
        className={`${styles.alertStyle} ${
          successfulPost ? styles.showAlert : ""
        } 
        ${successfulPost ? styles.show : ""}  
        `}
      >
        <MdCheckCircle className={styles.alertSuccessIcon} />

        <span className={styles.alertMessage}>Successfully signed in!</span>
      </div>
    </div>
  );
}

Signup.getLayout = function PageLayout(page) {
  return <>{page}</>;
};
