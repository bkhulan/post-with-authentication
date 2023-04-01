import connectMongoose from "../../utils/connectMongoose";
import { ImImage } from "react-icons/im";

const FormData = require("form-data");

import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Image from "next/image";
import Head from "next/head";
import jwt from "jsonwebtoken";

import Post from "../../models/posts";
import Navbar from "../../components/Navbar";
import styles from "./Post.module.css";

function Loggedinpost({ alldata }) {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageInput, setImageInput] = useState(null);
  const [emptyFile, setEmptyFile] = useState(false);
  // const [image, setImage] = useState(null);

  const titleHandler = (e) => {
    setTitle(e.target.value);
  };

  const descriptionHandler = (e) => {
    setDescription(e.target.value);
  };

  const imageHandler = (e) => {
    const file = e.target.files[0];
    setImageInput(file);

    // const fileReader = new FileReader();
    // fileReader.onload = function (e) {
    //   setImage(e.target.result);
    // };
    // fileReader.readAsDataURL(file);
  };

  const buttonHandler = (e) => {
    e.preventDefault();
    let formData = new FormData();

    formData.append("myImage", imageInput);
    formData.append("title", title);
    formData.append("description", description);

    // let formDataObject = Object.fromEntries(formData.entries());
    // let formDataJsonString = JSON.stringify(formDataObject);

    async function postData() {
      await axios("http://localhost:3000/api/requests/postdata", {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      })
        .then((res) => {
          console.log("Successfully sent the data to the backend!");
          router.replace(router.asPath);
        })
        .catch((e) => {
          console.log(e, "Getting an error!");
        });
    }

    postData();

    setTitle("");
    setDescription("");
    // setImage(null);
    setImageInput(null);
  };

  return (
    <div>
      <Head>
        <title>Post</title>
      </Head>
      <Navbar />
      <main className={styles.main}>
        <section className={styles.photoDataSection}>
          {alldata
            .slice(0)
            .reverse()
            .map((data) => (
              <div key={data._id}>

                <p>Title: {data.title}</p>
                <p>Description: {data.description}</p>

                <div className={styles.imageDiv}>
                  <Image
                  className={styles.divInsideImage}
                    src={`/${data.myImage}`}
                    alt={data.title}
                    // placeholder="blur"
                    // blurDataURL=""
                    // priority
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </div>
            ))}
        </section>
        <section className={styles.postInputSection}>
          <form
            onSubmit={buttonHandler}
            action="/api/requests/postdatanew"
            method="POST"
            encType="multipart/form-data"
            className={styles.postInputForm}
          >
            <input
              onChange={titleHandler}
              type="text"
              placeholder="Title"
              value={title}
              className={styles.postInput}
              required
            />
            <input
              onChange={descriptionHandler}
              type="text"
              placeholder="Description"
              value={description}
              className={styles.postInput}
              required
            />
            <button htmlFor="picture" className={styles.postInputFileButton}>
              <ImImage className={styles.addImageIcon} />
              Choose a photo
              <input
                onChange={imageHandler}
                type="file"
                name="image"
                id="picture"
                accept="image/jpg, image/png"
                className={styles.postInputFileHidden}
              />
            </button>
            {emptyFile && <p>Not chosen, yet!</p>}

            <button className={styles.postButton} type="submit">
              Submit
            </button>
            {/* <div>{image && <img src={image} style={{ width: "100px" }} />}</div> */}
          </form>
        </section>
      </main>
    </div>
  );
}

export default Loggedinpost;

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
