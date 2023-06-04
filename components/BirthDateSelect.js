import React from "react";

import styles from "./BirthDateSelect.module.css";

export default function BirthDateSelect(props) {
  return (
    <div>
      <div className={styles.pTagBirthDate}>Birthday:</div>

      <div className={styles.inputDateParent}>
        <input
          type="date"
          className={styles.inputDate}
          onChange={(e) => {
            props.setUserBirthday(e.target.value);
          }}
          // className={`${styles.birthDateSelect} ${
          //   invalidBirthday ? styles.error : ""
          // }`}
        />
      </div>
    </div>
  );
}
