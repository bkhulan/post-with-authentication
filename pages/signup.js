import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Head from "next/head";
import moment from "moment";

import styles from "../styles/Home.module.css";

export default function Signup() {
  const router = useRouter();
  let today = new Date();

  const [name, setName] = useState("");
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

  const buttonHandler = async (e) => {
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
          name,
          email,
          password,
          birthDate: userBirthday,
        }
      );

      console.log("Client response ===== ", res);
      console.log(name.trim());
      console.log(email.trim());
      console.log(password.trim());
      console.log(`${year}/${month}/${day}`);

      if (res.status === 201) {
        router.push("/login");
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
    <div className={styles.mainContainer}>
      <Head>
        <title>Signup</title>
      </Head>
      <form onSubmit={buttonHandler} className={styles.subContainer}>
        <div className={styles.subInputStyle}>
          <input
            type="text"
            placeholder="Name"
            onChange={nameHandler}
            className={styles.loginSignupInput}
            value={name}
            required
          />
        </div>
        <div className={styles.subInputStyle}>
          <input
            type="email"
            placeholder="Email"
            className={`${styles.loginSignupInput} ${
              !emailValid || duplicateEmail ? styles.error : ""
            }`}
            onChange={emailHandler}
            value={email}
            required
          />
        </div>
        <div className={styles.subInputStyle}>
          <input
            type="password"
            placeholder="Password"
            className={`${styles.loginSignupInput} ${
              confirmePasswordError || !passwordValid ? styles.error : ""
            }`}
            onChange={passwordHandler}
            value={password}
            required
          />
        </div>
        <div className={styles.subInputStyle}>
          <input
            type="password"
            placeholder="Confirm password"
            className={`${styles.loginSignupInput} ${
              confirmePasswordError ? styles.error : ""
            }`}
            onChange={confirmPasswordHandler}
            value={confirmPassword}
            required
          />
        </div>
        <div className={styles.birthDateStyle}>
          <div>Birthday:</div>
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
              invalidBirthday ? styles.error : ""
            }`}
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
              invalidBirthday ? styles.error : ""
            }`}
            onChange={yearHandler}
          >
            <option value="" label="Year"></option>
            {allYears.map((year, index) => (
              <option value={year} key={index}>
                {year}
              </option>
            ))}
          </select>
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

        <div className={styles.subButton}>
          <button className={styles.button}>Submit</button>
        </div>
      </form>
    </div>
  );
}

Signup.getLayout = function PageLayout(page) {
  return <>{page}</>;
};
