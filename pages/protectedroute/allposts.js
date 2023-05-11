import connectMongoose from "../../utils/connectMongoose";

import Image from "next/image";
import Post from "../../models/posts";
import jwt from "jsonwebtoken";

import styles from "./allposts.module.css";

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
                // src={`/${data.myImage}`}
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
  const { cookies } = req;
  const jwtCookie = cookies.CookieJWT;

  const claims = jwt.verify(jwtCookie, process.env.SECRET);

  const post = await Post.find({ userId: claims._id });

  return {
    props: {
      alldata: JSON.parse(JSON.stringify(post)),
    },
  };
}
