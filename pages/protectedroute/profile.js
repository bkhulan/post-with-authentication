import connectMongoose from "../../utils/connectMongoose";
const jwt = require("jsonwebtoken");
import User from "../../models/users";

import Image from "next/image";
import Head from "next/head";
import Navbar from "../../components/Navbar";
import styles from "./Profile.module.css";
import stylesHome from "../../styles/Home.module.css";

function Profile({ dataUser }) {
  return (
    <>
      <Head>
        <title>Profile</title>
        <script
          src="https://kit.fontawesome.com/eb0ac8b9ac.js"
          crossorigin="anonymous"
        ></script>
      </Head>
      <Navbar />
      <main className={stylesHome.main}>
        <section className={styles.profileSection}>
          <div key={dataUser._id} className={styles.profileSectionDiv}>
            <div className={styles.columnContainer}>
              <div className={styles.iconDiv}>
                <i class="fa fa-signature"></i>
              </div>
              <div>
                <p className={styles.valuesFromData}>{dataUser.name}</p>
                <p className={styles.properties}>Name</p>
              </div>
            </div>

            <div className={styles.columnContainer}>
              <div className={styles.iconDiv}>
                <i class="fa fa-envelope"></i>
              </div>
              <div>
                <p>{dataUser.email}</p>
                <p className={styles.properties}>Email</p>
              </div>
            </div>

            <div className={styles.columnContainer}>
              <div className={styles.iconDiv}>
                <Image src={"/icon/birthday-cake.png"} width={19} height={19} />
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

  let month = newDateObject.getMonth();
  let day = newDateObject.getDay();
  let year = newDateObject.getFullYear();

  let copyOfUser = { ...parsedUser};
  copyOfUser.birthDate = `${year}-${month}-${day}`;

  return {
    props: {
      dataUser: copyOfUser,
    },
  };
}
