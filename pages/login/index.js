import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import Image from "next/image";
import Head from "next/head";
import Link from "next/link";

import styles from "../../styles/Home.module.css";

export default function Home() {
  const router = useRouter();

  const [userEmail, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorUser, setErrorUser] = useState("");

  const userEmailHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const buttonHandler = (e) => {
    e.preventDefault();

    if (userEmail.trim() === "" || password.trim() === "") {
      return console.log("Enter values!!!");
    } else {
      console.log(userEmail.trim());
      console.log(password.trim());
    }

    async function loginButtonFunc() {
      try {
        const res = await axios.post(
          "http://localhost:3000/api/requests/login",
          {
            email: userEmail,
            password,
          }
        );
        console.log(res.data, "Successfully sent the data! (Frontend)");

        setErrorUser("");

        if (res.status === 201) {
          router.push("/protectedroute/post");
        }
      } catch (e) {
        if (e.response && e.response.status === 401) {
          setErrorUser(e.response.data);
        }
        console.log(e, "Error! (Frontend)");
      }
    }
    loginButtonFunc();
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Login</title>
      </Head>

      <main className={styles.mainTagContainer}>
        <div className={`${styles.imageBackground}`}>
          <div className={`${styles.divImageSentence}`}>
            <h1>Welcome Back!</h1>
            <p className={styles.pTagImageSentence}>
              To keep connected with us please login with your personal info.
            </p>
          </div>
        </div>

        <div className={styles.mainFormContainer}>

          <form className={styles.formContainer} onSubmit={buttonHandler}>
            <p className={styles.title}>Salvatore</p>
            <input
              type="email"
              placeholder="Email"
              className={`${styles.loginSignupInput} ${
                errorUser === "Email is not registered!" ? styles.error : ""
              }`}
              onChange={userEmailHandler}
              value={userEmail}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className={`${styles.loginSignupInput} ${
                errorUser === "Password incorrect!" ? styles.error : ""
              }`}
              onChange={passwordHandler}
              value={password}
              required
            />
            {errorUser && <p className={styles.errorParagraph}>{errorUser}</p>}
            <button className={styles.loginButton}>Log in</button>
            <Link className={styles.signupButton} href="/signup">
              Create new account
            </Link>
          </form>

        </div>
      </main>
    </div>
  );
}

Home.getLayout = function PageLayout(page) {
  return <>{page}</>;
};
