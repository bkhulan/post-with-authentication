const FormData = require("form-data");

import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

import styles from "./post.module.css";

function Loggedinpost({ alldata }) {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // const [image, setImage] = useState(null);

  const [imageInput, setImageInput] = useState(null);

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

  const handelLogOut = async () => {
    const res = await axios.get("/api/requests/logout");
    console.log("user === ", res);
    if (res.status === 200) {
      router.push("/login");
    }
  };

  return (
    <div>
      <div className={styles.mainNav}>
        <Link href="/" className={styles.navText}>
          Home
        </Link>
        <Link href="/login" className={styles.navText}>
          Sign out
        </Link>
        <Link href="" className={styles.navText} onClick={handelLogOut}>
          Log out
        </Link>
      </div>

      <main className={styles.main}>
        <section>
          {alldata
            .slice(0)
            .reverse()
            .map((data, index) => (
              <div key={index}>
                <p>Title: {data.title}</p>
                <p>Description: {data.description}</p>
                <Image
                  src={`/${data.myImage}`}
                  alt="Picture of the author"
                  // placeholder='blur'
                  // blurDataURL=''
                  width={300}
                  height={300}
                />
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
            />
            <input
              onChange={descriptionHandler}
              type="text"
              placeholder="Description"
              value={description}
              className={styles.postInput}
            />
            <input
              onChange={imageHandler}
              type="file"
              name="image"
              accept="image/jpg, image/png"
              className={styles.postInput}
            />
            {/* <div>{image && <img src={image} style={{ width: "100px" }} />}</div> */}
            <button type="submit">Submit</button>
          </form>
        </section>
      </main>
    </div>
  );
}

export default Loggedinpost;

export async function getStaticProps() {
  const res = await fetch("http://localhost:3000/api/requests/alldata");
  const alldata = await res.json();

  return {
    props: {
      alldata,
    },
  };
}
