import connectMongoose from "../../utils/connectMongoose";

import { FaSignature, FaBirthdayCake } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
// const jwt = require("jsonwebtoken");
// import moment from "moment";
import { getSession, useSession } from "next-auth/react";

import User from "../../models/users";
import Head from "next/head";

import styles from "./Profile.module.css";
import stylesHome from "../../styles/Home.module.css";

export default function Profile({ dataUser }) {
  const { data: session } = useSession();
  console.log("SESSION ==== ", session);
  
  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>

      {NoProviderUserProfile({ dataUser })}
    </>
  );
}

function NoProviderUserProfile({ dataUser }) {
  return (
    <main className={stylesHome.main}>
      <section className={styles.profileSection}>
        <div key={dataUser._id} className={styles.profileSectionDiv}>
          <div className={styles.columnContainer}>
            <div className={styles.iconDiv}>
              <FaSignature />
            </div>
            <div>
              <p className={styles.valuesFromData}>
                {dataUser.firstName} {dataUser.lastName}
              </p>
              <p className={styles.properties}>Name</p>
            </div>
          </div>

          <div className={styles.columnContainer}>
            <div className={styles.iconDiv}>
              <MdEmail />
            </div>
            <div>
              <p className={styles.valuesFromData}>{dataUser.email}</p>
              <p className={styles.properties}>Email</p>
            </div>
          </div>

          <div className={styles.columnContainer}>
            <div className={styles.iconDiv}>
              <FaBirthdayCake />
            </div>
            <div>
              <p className={styles.valuesFromData}>{dataUser.birthDate}</p>
              <p className={styles.properties}>Birth date</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// function UsedProviderUserProfile () {
//   return (

//   )
// }

export async function getServerSideProps({ req, res }) {
  await connectMongoose();
  console.log("Connected to the database. (Profile!)");

  const session = await getSession({ req });
  console.log("SESSION", session);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        premanent: false,
      },
    };
  }

  const user = await User.findOne({ email: session.user.email });

  const parsedUser = JSON.parse(JSON.stringify(user));
  const newBirthDateObject = new Date(parsedUser.birthDate);
  const newStringDate = newBirthDateObject.toISOString().split("T")[0];

  let copyOfUser = { ...parsedUser };
  copyOfUser.birthDate = newStringDate;

  return {
    props: {
      dataUser: copyOfUser,
    },
  };
}

// ========================================================

// JWTCookie ashiglay gewel eniig

// const { cookies } = req;
// const jwtCookie = cookies.CookieJWT;

// const claims = jwt.verify(jwtCookie, process.env.SECRET);
// const user = await User.findOne({ _id: claims._id });

// let parsedUser = JSON.parse(JSON.stringify(user));
// let newDateObject = new Date(parsedUser.birthDate);
// let newStringDate = newDateObject.toISOString().split('T')[0];

// ========================================================
