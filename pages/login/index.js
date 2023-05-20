import { useState, useRef } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import Image from "next/image";
import Head from "next/head";
import Link from "next/link";

import styles from "../../styles/Home.module.css";

export default function Home() {
  const router = useRouter();
  const myRef = useRef();

  const [userEmail, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorUser, setErrorUser] = useState("");

  const userEmailHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const loginButtonHandler = (e) => {
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
          router.push("/protectedroute/addpost");
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

  const goToSignupPageHandler = () => {
    myRef.current.classList.add("right-panel-active");
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Login</title>
      </Head>

      <main className={styles.mainTagContainer}>
        <div ref={myRef} className={`${styles.imageBackground}`}>
          <div className={`${styles.divImageSentence}`}>
            <h1>Welcome Back!</h1>
            <p className={styles.pTagImageSentence}>
              To keep connected with us please login with your personal info.
            </p>
          </div>
        </div>

        <div className={styles.mainFormContainer}>
          <form className={styles.formContainer} onSubmit={loginButtonHandler}>
            <p
              className={`${styles.title} ${styles.loginTitle} ${styles.loginLogoutTitle}`}
            >
              Dream
            </p>

            <div className={styles.inputBox}>
              <input
                type="email"
                className={`${styles.loginSignupInput} ${styles.loginInput} ${
                  errorUser === "Email is not registered!" ? styles.error : ""
                }`}
                onChange={userEmailHandler}
                value={userEmail}
                required
                placeholder=" "
                autoComplete="on"
              />
              <span className={styles.spanLoginSignupInput}>Email</span>
            </div>

            <div className={styles.inputBox}>
              <input
                type="password"
                className={`${styles.loginSignupInput} ${styles.loginInput} ${
                  errorUser === "Password incorrect!" ? styles.error : ""
                }`}
                onChange={passwordHandler}
                value={password}
                required
                placeholder=" "
              />
              <span className={styles.spanLoginSignupInput}>Password</span>
            </div>

            {errorUser && <p className={styles.errorParagraph}>{errorUser}</p>}

            <div className={styles.allButtonBox}>
              <button
                className={`${styles.allFourButtons} ${styles.loginSignupSubmiButton}`}
              >
                Log in
              </button>
            </div>

            <div className={`${styles.allButtonBox} ${styles.customButtonBox}`}>
              <button
                type="button"
                className={`${styles.allFourButtons} ${styles.buttonCustom}`}
              >
                Sign In with Google
                <Image
                  src={"/google.svg"}
                  width={20}
                  height={20}
                  className={styles.buttonIcons}
                ></Image>
              </button>
            </div>

            <div className={`${styles.allButtonBox} ${styles.customButtonBox}`}>
              <button
                type="button"
                className={`${styles.allFourButtons} ${styles.buttonCustom}`}
              >
                Sign In with Github
                <Image
                  src={"/github.svg"}
                  width={20}
                  height={20}
                  className={styles.buttonIcons}
                ></Image>
              </button>
            </div>

            <Link
              onClick={goToSignupPageHandler}
              className={styles.loginSignupLinkButton}
              href="/signup"
            >
              Don't have an account? Sign up
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
