import axios from "axios";
import { useEffect, useState } from "react";
const FormData = require("form-data");

import styles from "../../styles/Home.module.css";
import Link from "next/link";

function Loggedinpost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [image, setImage] = useState(null);
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

    const fileReader = new FileReader();

    fileReader.onload = function (e) {
      setImage(e.target.result);
    };

    fileReader.readAsDataURL(file);
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
  };

  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const response = await axios.get(
  //         "http://localhost:3000/api/v1/alldata"
  //       );
  //       setAllData(response.data.reverse());
  //       console.log(response);
  //     } catch (error) {
  //       console.log("Error!", error);
  //     }
  //   };
  //   getData();
  // }, []);

  return (
    <div className={styles.container}>
      <div className={styles.mainNav}>
        <Link href="/">
          <a className={styles.navText}>Home</a>
        </Link>
        <Link href="/login">
          <a className={styles.navText}>Sign out</a>
        </Link>
      </div>

      <main className={styles.main}>
        {/* <section>
          {allData.map((data, index) => (
            <div key={index}>
              <p>Title: {data.title}</p>
              <p>Description: {data.description}</p>
              <Image
                loader={({ src }) => {
                  return `http://localhost:3000/${data.photo}`;
                }}
                src={`http://localhost:3000/${data.photo}`}
                alt="Picture of the author"
                width={300}
                height={300}
              />
            </div>
          ))}
        </section> */}
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
            <div>{image && <img src={image} style={{ width: "100px" }} />}</div>
            <button type="submit">Submit</button>
          </form>
        </section>
      </main>
    </div>
  );
}

export default Loggedinpost;
