import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import moment from "moment";
import Head from "next/head";
import Link from "next/link";
// import Date from "../components/Date";

import { MdCheckCircle } from "react-icons/md";

import styles from "../styles/Home.module.css";

export default function Signup() {
  const router = useRouter();
  let today = new Date();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [year, setYear] = useState("");

  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [confirmePasswordError, setConfirmPasswordError] = useState(false);
  const [duplicateEmail, setDuplicateEmail] = useState(null);
  const [invalidBirthday, setInvalidBirthday] = useState(false);
  const [successfulPost, setSuccessfulPost] = useState(false);

  const firstNameHandler = (e) => {
    setFirstName(e.target.value);
  };
  const lastNameHandler = (e) => {
    setLastName(e.target.value);
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
  const monthHandler = (e) => {
    setMonth(e.target.value);
  };
  const dayHandler = (e) => {
    setDay(e.target.value);
  };
  const yearHandler = (e) => {
    setYear(e.target.value);
  };

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

    let userBirthdayGreen = new Date(`${year}-${month}-${day}`);
    console.log(userBirthdayGreen);

    let userBirthday = new Date(`${year}-${month}-${day} EDT`);

    let msSince = today.getTime() - userBirthday.getTime();
    let daysSince = Math.floor(msSince / (1000 * 60 * 60 * 24));
    let yearsSince = Math.floor(daysSince / 365);

    console.log("Day and year.", daysSince, yearsSince);

    if (yearsSince < 16) {
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
      // console.log(`${year}/${month}/${day}`);

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

  const allMonths = moment.months();

  const allDays = [];

  for (let i = 1; i <= 31; i++) {
    allDays.push(i);
  }

  console.log("DAYS", allDays);

  const allYears = [];

  const todayYear = today.getFullYear();
  const untilPastYear = todayYear - 120;

  for (let i = todayYear; i >= untilPastYear; i--) {
    allYears.push(i);
  }

  console.log(allYears);

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
                onChange={firstNameHandler}
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
                onChange={lastNameHandler}
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
                onChange={emailHandler}
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
                onChange={passwordHandler}
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
                onChange={confirmPasswordHandler}
                value={confirmPassword}
                placeholder=" "
                required
              />
              <span className={styles.spanLoginSignupInput}>
                Confirm password
              </span>
            </div>

            <div>
              <div className={styles.pTagBirthDate}>Birthday:</div>
              <div className={styles.birthDateParentDivOfSelect}>
                <span className={styles.birthDateSpanTag}>
                  <select
                    name="Month"
                    required
                    className={`${styles.birthDateSelect} ${
                      invalidBirthday ? styles.error : ""
                    }`}
                    onChange={monthHandler}
                  >
                    <option label="Month" value=""></option>
                    {allMonths.map((month, index) => (
                      <option value={index + 1} key={index}>
                        {month}
                      </option>
                    ))}
                  </select>
                  <select
                    name="Day"
                    required
                    className={`${styles.birthDateSelect} ${
                      styles.dayYearSelect
                    } ${invalidBirthday ? styles.error : ""}`}
                    onChange={dayHandler}
                  >
                    <option label="Day" value=""></option>
                    {allDays.map((day, index) => (
                      <option value={day} key={index + 1}>
                        {day}
                      </option>
                    ))}
                  </select>
                  <select
                    name="Year"
                    required
                    className={`${styles.birthDateSelect} ${
                      styles.dayYearSelect
                    } ${invalidBirthday ? styles.error : ""}`}
                    onChange={yearHandler}
                  >
                    <option value="" label="Year"></option>
                    {allYears.map((year, index) => (
                      <option value={year} key={index}>
                        {year}
                      </option>
                    ))}
                  </select>
                </span>
              </div>
            </div>

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
