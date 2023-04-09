import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Head from "next/head";

import styles from "../styles/Home.module.css";

function Signup() {
  const router = useRouter();

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
  const [duplicateEmail, setDuplicateEmail] = useState(false);
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
    setDuplicateEmail(false);
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

    let today = new Date();
    let userBirthday = new Date(`${year}-${month}-${day}`);

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
          birthDate: new Date(`${month} ${day} ${year}`),
        }
      );

      console.log("Client response ===== ", res);
      console.log(name.trim());
      console.log(email.trim());
      console.log(password.trim());
      console.log(`${year}-${month}-${day}`);

      if (res.status === 201) {
        router.push("/login");
      }
    } catch (e) {
      if (e.response.data) {
        setDuplicateEmail(true);
        return;
      }
    }
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
            <option value="january">January</option>
            <option value="february">February</option>
            <option value="march">March</option>
            <option value="april">April</option>
            <option value="may">May</option>
            <option value="june">June</option>
            <option value="july">July</option>
            <option value="august">August</option>
            <option value="september">September</option>
            <option value="october">October</option>
            <option value="november">November</option>
            <option value="december">December</option>
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
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
            <option value="16">16</option>
            <option value="17">17</option>
            <option value="18">18</option>
            <option value="19">19</option>
            <option value="20">20</option>
            <option value="21">21</option>
            <option value="22">22</option>
            <option value="23">23</option>
            <option value="24">24</option>
            <option value="25">25</option>
            <option value="26">26</option>
            <option value="27">27</option>
            <option value="28">28</option>
            <option value="29">29</option>
            <option value="30">30</option>
            <option value="31">31</option>
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
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
            <option value="2019">2019</option>
            <option value="2018">2018</option>
            <option value="2017">2017</option>
            <option value="2016">2016</option>
            <option value="2015">2015</option>
            <option value="2014">2014</option>
            <option value="2013">2013</option>
            <option value="2012">2012</option>
            <option value="2011">2011</option>
            <option value="2010">2010</option>
            <option value="2009">2009</option>
            <option value="2008">2008</option>
            <option value="2007">2007</option>
            <option value="2006">2006</option>
            <option value="2005">2005</option>
            <option value="2004">2004</option>
            <option value="2003">2003</option>
            <option value="2002">2002</option>
            <option value="2001">2001</option>
            <option value="2000">2000</option>
            <option value="1999">1999</option>
            <option value="1998">1998</option>
            <option value="1997">1997</option>
            <option value="1996">1996</option>
            <option value="1995">1995</option>
            <option value="1994">1994</option>
            <option value="1993">1993</option>
            <option value="1992">1992</option>
            <option value="1991">1991</option>
            <option value="1990">1990</option>
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
        {duplicateEmail ? (
          <p className={styles.errorParagraph}>
            There is already an account with this email.
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

export default Signup;

Signup.getLayout = function PageLayout(page) {
  return <>{page}</>;
};
