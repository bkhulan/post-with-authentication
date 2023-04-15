import connectMongoose from "../../utils/connectMongoose";
import { ImImage } from "react-icons/im";

const FormData = require("form-data");

import { useState, useRef } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Image from "next/image";
import Head from "next/head";
import jwt from "jsonwebtoken";

import Post from "../../models/posts";
import Navbar from "../../components/Navbar";
import styles from "./Post.module.css";
import stylesHome from "../../styles/Home.module.css";

function Loggedinpost({ alldata }) {
  const router = useRouter();
  const inputRef = useRef(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageInput, setImageInput] = useState(null);
  const [imageFileName, setImageFileName] = useState("No selected file.");
  const [imageFileEmptyError, setImageFileEmptyError] = useState(false);

  const [successfulPost, setSuccessfulPost] = useState(false);
  // const [image, setImage] = useState(null);

  const titleHandler = (e) => {
    setTitle(e.target.value);
  };

  const descriptionHandler = (e) => {
    setDescription(e.target.value);
  };

  let imageHandler = (e) => {
    const file = e.target.files[0];

    setImageInput(file);
    setImageFileName(file.name);
    setImageFileEmptyError(false);

    // const fileReader = new FileReader();
    // fileReader.onload = function (e) {
    //   setImage(e.target.result);
    // };
    // fileReader.readAsDataURL(file);
  };

  function resetValidationErrors() {
    setImageFileEmptyError(false);
    // setImage(null);
  }

  const buttonHandler = (e) => {
    e.preventDefault();

    resetValidationErrors();

    if (imageInput == null) {
      return setImageFileEmptyError(true);
    }

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

          setSuccessfulPost(true);

          router.replace(router.asPath);

          setTimeout(function () {
            setSuccessfulPost(false);
          }, 1000);

          inputRef.current.value = null;
        })
        .catch((e) => {
          console.log(e, "Getting an error!");
          setSuccessfulPost(false);
        });
    }

    postData();

    setTitle("");
    setDescription("");
    setImageInput(null);
    setImageFileName("No selected file.");
  };

  return (
    <div>
      <Head>
        <title>Post</title>
      </Head>
      <Navbar />
      <main className={stylesHome.main}>
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
            <textarea
              onChange={descriptionHandler}
              type="text"
              placeholder="Description"
              value={description}
              className={`${styles.postInput} ${styles.textAreaFont}`}
              required
            ></textarea>
            <div className={styles.postInputFileButtonContainerDiv}>
              <div>
                <button
                  htmlFor="picture"
                  className={styles.postInputFileButton}
                >
                  <ImImage className={styles.addImageIcon} />
                  Choose a photo
                  <input
                    ref={inputRef}
                    onChange={imageHandler}
                    type="file"
                    name="image"
                    id="picture"
                    accept="image/jpg, image/png"
                    className={styles.postInputFileHidden}
                  />
                </button>
              </div>
              <div className={styles.postInputFileP}>
                {imageFileName && <p>{imageFileName}</p>}
              </div>
            </div>

            {imageFileEmptyError ? (
              <p className={styles.successfulPost}>Insert an image, please!</p>
            ) : (
              ""
            )}

            <button className={styles.postButton} type="submit">
              Submit
            </button>

            {/* <div>{image && <img src={image} style={{ width: "100px" }} />}</div> */}

            {successfulPost ? (
              <p className={styles.successfulPost}>Successfully posted!</p>
            ) : (
              ""
            )}
          </form>
        </section>

        <section className={styles.photoDataSection}>
          {alldata
            .slice(0)
            .reverse()
            .map((data) => (
              <div key={data._id} className={styles.postContainer}>
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
