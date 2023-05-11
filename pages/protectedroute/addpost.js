// import { ImImage } from "react-icons/im";

const FormData = require("form-data");

import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Image from "next/image";
import Modal from "../../components/Modal";
import { IoMdCloudUpload } from "react-icons/io";
import { AiFillCloseCircle } from "react-icons/ai";
import Head from "next/head";

import styles from "./Addpost.module.css";

function Loggedinpost() {
  // const router = useRouter();
  const inputRef = useRef();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [imageInput, setImageInput] = useState(null);
  const [imageFileName, setImageFileName] = useState(null);
  const [imageFileEmptyError, setImageFileEmptyError] = useState(false);

  const [fileURLValue, setfileURLValue] = useState(null);

  const [dragFile, setDragFile] = useState(false);

  const [successfulPostModalShow, setSuccessfulPostModalShow] = useState(false);

  const titleInput = useCallback((inputElement) => {
    if (inputElement) {
      inputElement.focus();
    }
  }, []);

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

    const fileType = file.type;
    showImageFunction(file, fileType);

    setImageFileEmptyError(false);
  };

  const dropHandler = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];

    setImageInput(file);
    setImageFileName(file.name);

    const fileType = e.dataTransfer.files[0].type;
    showImageFunction(file, fileType);

    setImageFileEmptyError(false);
  };

  function showImageFunction(valueFile, valueFileType) {
    let validExtenstions = ["image/jpeg", "image/jpg", "image/png"];

    if (validExtenstions.includes(valueFileType)) {
      let fileReader = new FileReader(); // Creating new FileReader object

      fileReader.onload = () => {
        let fileUrl = fileReader.result; // passing user file source in fileURL variable.
        setfileURLValue(fileUrl);
      };
      fileReader.readAsDataURL(valueFile);
    } else {
      console.log("This is not an Image file.");
      return;
    }
  }

  function closeIconHandler() {
    setfileURLValue(null);
    setImageFileName(null);
  }

  function resetValidationErrors() {
    setImageFileEmptyError(false);
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

          setSuccessfulPostModalShow(true);

          // router.replace(router.asPath); // Submit hiinguut zurag shuud garch ireh

          // setTimeout(function () {
          //   setSuccessfulPost(false);
          // }, 1000);

          // inputRef.current.value = null;
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
    setImageFileName(null);
    setfileURLValue(null);
  };

  return (
    <div>
      <Head>
        <title>Post</title>
      </Head>
      <main className={styles.mainContainer}>
        <div className={styles.postInputSection}>
          <form
            onSubmit={buttonHandler}
            action="/api/requests/postdatanew"
            method="POST"
            encType="multipart/form-data"
            className={styles.postInputForm}
          >
            <h3 className={styles.createPostTitle}>Create post</h3>
            <input
              ref={titleInput}
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
              className={`${styles.textArea}`}
              required
            ></textarea>
            <div
              className={`${styles.dragAreaContainer} ${
                fileURLValue ? styles.active : ""
              }`}
              onDragOver={(e) => {
                e.preventDefault();
                setDragFile(true);
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                setDragFile(false);
              }}
              onDrop={dropHandler}
            >
              {fileURLValue ? (
                <div className={styles.afterUploadedImageDragarea}>
                  <AiFillCloseCircle
                    className={styles.closeIcon}
                    onClick={closeIconHandler}
                  />
                  <Image
                    src={fileURLValue}
                    alt={imageFileName}
                    width={600}
                    height={600}
                    style={{
                      maxWidth: "100%",
                      height: "auto",
                    }}
                  />
                </div>
              ) : (
                <div className={styles.beforeUploadImageDragarea}>
                  <IoMdCloudUpload className={styles.inputFileUploadIcon} />
                  <p className={styles.fileUploadSentence}>
                    {dragFile
                      ? "Release to upload image."
                      : "Drag and Drop to Upload image."}
                  </p>
                  <span className={styles.orSpanTag}>OR</span>
                  <button className={styles.uploadButton}>
                    <input
                      ref={inputRef}
                      onChange={imageHandler}
                      type="file"
                      name="image"
                      id="picture"
                      accept="image/*"
                      className={styles.postInputFileHidden}
                    />
                    Select image
                  </button>
                </div>
              )}
            </div>
            <p className={styles.noSelectedOrSelectedPtag}>
              {imageFileName ? imageFileName : "No selected image."}
            </p>

            {imageFileEmptyError ? (
              <p className={styles.successfulPost}>Insert an image, please!</p>
            ) : (
              ""
            )}
            <button className={styles.postButton} type="submit">
              Submit
            </button>
            {successfulPostModalShow ? (
              <Modal
                show={successfulPostModalShow}
                onClose={() => {
                  setSuccessfulPostModalShow(false);
                }}
              >
                Successfully posted!
              </Modal>
            ) : (
              ""
            )}
          </form>
        </div>
      </main>
    </div>
  );
}

export default Loggedinpost;
