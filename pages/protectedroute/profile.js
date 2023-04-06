import connectMongoose from "../../utils/connectMongoose";
const jwt = require("jsonwebtoken");
import User from "../../models/users";

import Navbar from "../../components/Navbar";
import styles from "./Profile.module.css"

function Profile({ dataUser }) {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div key={dataUser._id}>
          <p>Name: {dataUser.name}</p>
          <p>Email: {dataUser.email}</p>
          <p>Birth date: {dataUser.birthDate}</p>
        </div>
      </main>
    </>
  );
}

export default Profile;

export async function getServerSideProps({ req, res }) {
  // console.log('GETSERVERSIDE====', req.cookies);
  await connectMongoose();
  console.log("Connected to the database. (Profile!)");
  const { cookies } = req;
  const jwtCookie = cookies.CookieJWT;

  const claims = jwt.verify(jwtCookie, process.env.SECRET);  
  const user = await User.findOne({ _id: claims._id });

  // const response = await fetch("http://localhost:3000/api/requests/profile");
  // const alldata = await response.json();

  return {
    props: {
      dataUser: JSON.parse(JSON.stringify(user)),
    },
  };
}
