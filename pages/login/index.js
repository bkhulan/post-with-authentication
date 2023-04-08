import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import axios from "axios";

import styles from "../../styles/Home.module.css";

export default function Home() {
  const router = useRouter();

  const [userEmail, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorUser, setErrorUser] = useState(null);
  // const [ifDisabled, ifSetDisabled] = useState(true);

  const userEmailHandler = (e) => {
    setEmail(e.target.value);
    // if (e.target.value.length > 1 && password.length > 6) {
    //   ifSetDisabled(false);
    // } else {
    //   ifSetDisabled(true);
    // }
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
    // if (e.target.value.length > 6 && userEmail > 1) {
    //   ifSetDisabled(false);
    // } else {
    //   ifSetDisabled(true);
    // }
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
    <div className={styles.mainContainer}>
      <Head>
        <title>Login</title>
      </Head>

      <main>
        <form onSubmit={buttonHandler} className={styles.subContainer}>
          <input
            type="email"
            placeholder="Email"
            className={styles.loginSignupInput}
            onChange={userEmailHandler}
            value={userEmail}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className={styles.loginSignupInput}
            onChange={passwordHandler}
            value={password}
            required
          />
          {errorUser && <p className={styles.errorParagraph}>{errorUser}</p>}
          <div className={styles.subButton}>
            <button className={styles.button}>Log in</button>
          </div>
        </form>
      </main>
    </div>
  );
}

Home.getLayout = function PageLayout(page) {
  return <>{page}</>;
};
