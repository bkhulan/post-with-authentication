import connectMongoose from "../../utils/connectMongoose";

import { getSession } from "next-auth/react";
import Image from "next/image";
import User from "../../models/users";
import Post from "../../models/posts";

import styles from "./allposts.module.css";
// import jwt from "jsonwebtoken";

export default function Allposts({ alldata }) {
  return (
    <section className={styles.imageAllDataSection}>
      <div className={styles.imageContainer}>
        {alldata
          .slice(0)
          .reverse()
          .map((data) => (
            <div key={data._id} className={styles.imageBox}>
              <Image
                className={styles.image}
                src={`/userPostImage/${data.myImage}`}
                alt={data.title}
                width={800}
                height={800}
                style={{
                  maxWidth: "100%",
                  height: "auto",
                }}
                // placeholder="blur"
                // blurDataURL=""
                // priority
                // layout="fill"
                // objectFit="cover"
              />
              <div className={styles.imageTitleAndDescriptionBox}>
                <p className={styles.allPostTitle}>{data.title}</p>
                <p className={styles.allPostDescription}>{data.description}</p>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}

export async function getServerSideProps({ req, res }) {
  await connectMongoose();
  console.log("Connected to the database. (POST IMAGE!)");

  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        premanent: false,
      },
    };
  }

  const user = await User.findOne({ email: session.user.email });
  const post = await Post.find({ userId: user._id });

  return {
    props: {
      alldata: JSON.parse(JSON.stringify(post)),
    },
  };
}

// ==================================================================================

// JWT ashiglawal ingej hiij boloh

// const { cookies } = req;
// const jwtCookie = cookies.CookieJWT;
// const claims = jwt.verify(jwtCookie, process.env.SECRET);
// const post = await Post.find({ userId: claims._id });

// ==================================================================================
