import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import axios from "axios";

import styles from "../../styles/Home.module.css";

export default function Home() {
  const router = useRouter();

  const [userEmail, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
        console.log(res, "Successfully sent the data! (Frontend)");

        if (res.status === 201) {
          router.push("/protectedroute/post");
        } else {
          console.log("Incorrect email or password!!!");
        }
      } catch (e) {
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
          />
          <input
            type="password"
            placeholder="Password"
            className={styles.loginSignupInput}
            onChange={passwordHandler}
            value={password}
          />
          <div className={styles.subButton}>
            <button className={styles.button}>Log in</button>
          </div>
        </form>
      </main>
    </div>
  );
}

//   try {
//     const res = await axios.post(
//       "http://localhost:3000/api/requests/login",
//       {
//         email: userEmail,
//         password,
//       }
//     );
//     console.log(res, "Successfully loggin in! (Frontend)");
//   } catch (e) {
//     console.log(e, "Error! (Frontend)");
//   }

// await axios("http://localhost:3000/api/requests/login", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   data: {
//     email: userEmail,
//     password,
//   },
// })
//   .then((res) => {
//     console.log(res, "Successfully loggin in! (Frontend)");
//   })
//   .catch((e) => {
//     console.log(e, "Error! (Frontend)");
//   });
