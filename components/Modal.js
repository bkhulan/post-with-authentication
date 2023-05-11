import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { GrClose } from "react-icons/gr";

import styles from "./Modal.module.css";

export default function Modal({ show, onClose, children }) {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleClose = (e) => {
    e.preventDefault();
    onClose();
  };

  const modalContent = show ? (
    <>
      <div className={styles.overlay} onClick={handleClose}></div>
      <div className={styles.modal}>
        <div className={styles.modalCloseIcon} onClick={handleClose}>
          <GrClose />
        </div>
        <div className={styles.header}>{children}</div>
      </div>
    </>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("modal-root")
    );
  } else {
    return null;
  }
}

{
  /* <button onClick={() => {
          setShowModal(true);
        }}
      >
        Show modal
      </button>
      <Modal
        show={showModal}
        onClose={() => {
          setShowModal(false);
        }}
      ></Modal> */
}
