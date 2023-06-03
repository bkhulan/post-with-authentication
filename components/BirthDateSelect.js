import React, { useState, useEffect } from "react";

import styles from "./BirthDateSelect.module.css";

export default function BirthDateSelect(props) {
  const [dateValue, setDateValue] = useState("");

  // let today = new Date();

  // const takeEachYMD = dateValue.split('-');
  // console.log(takeEachYMD);

  // const takeEachDateValue = new Date(`${takeEachYMD[0]}-${takeEachYMD[1]}-${takeEachYMD[2]} EDT`);

  // let msSince = today.getTime() - takeEachDateValue.getTime();
  // let daysSince = Math.floor(msSince / (1000 * 60 * 60 * 24));
  // let age = Math.floor(daysSince / 365);

  // console.log("dateValue==========", age);

  useEffect(() => {
    props.setUserBirthday(dateValue);
  }, [props]);

  return (
    <div>
      <div className={styles.pTagBirthDate}>Birthday:</div>
      <div className={styles.inputDateParent}>
        <input
          type="date"
          className={styles.inputDate}
          value={dateValue}
          onChange={(e) => {
            setDateValue(e.target.value);
          }}
          // className={`${styles.birthDateSelect} ${
          //   invalidBirthday ? styles.error : ""
          // }`}
        />
      </div>
    </div>
  );
}
