import connectMongoose from "../../utils/connectMongoose";
const jwt = require("jsonwebtoken");
import { FaSignature, FaBirthdayCake } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import moment from "moment";

import User from "../../models/users";
import Head from "next/head";

import styles from "./Profile.module.css";
import stylesHome from "../../styles/Home.module.css";

function Profile({ dataUser }) {
  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <main className={stylesHome.main}>
        <section className={styles.profileSection}>
          <div key={dataUser._id} className={styles.profileSectionDiv}>
            <div className={styles.columnContainer}>
              <div className={styles.iconDiv}>
                <FaSignature />
              </div>
              <div>
                <p className={styles.valuesFromData}>{dataUser.firstName} {dataUser.lastName}</p>
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
    </>
  );
}

export default Profile;

export async function getServerSideProps({ req, res }) {
  await connectMongoose();
  console.log("Connected to the database. (Profile!)");

  const { cookies } = req;
  const jwtCookie = cookies.CookieJWT;

  const claims = jwt.verify(jwtCookie, process.env.SECRET);
  const user = await User.findOne({ _id: claims._id });

  let parsedUser = JSON.parse(JSON.stringify(user));  
  let newDateObject = new Date(parsedUser.birthDate);
  let newStringDate = newDateObject.toISOString().split('T')[0];

  let copyOfUser = { ...parsedUser};
  copyOfUser.birthDate = newStringDate;

  return {
    props: {
      dataUser: copyOfUser,
    },
  };
}
