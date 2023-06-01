import React, { useState, useEffect } from "react";
// import moment from "moment";

import styles from "../styles/Home.module.css";

export default function BirthDateSelect(props) {
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [year, setYear] = useState("");

  let today = new Date();

  let userBirthday = new Date(`${year}-${month}-${day} EDT`);

  let msSince = today.getTime() - userBirthday.getTime();
  let daysSince = Math.floor(msSince / (1000 * 60 * 60 * 24));
  let yearsSince = Math.floor(daysSince / 365);

  props.howOldFunc(userBirthday, yearsSince);

  // const allMonths = moment.months();

  // const allDays = [];

  // for (let i = 1; i <= 31; i++) {
  //   allDays.push(i);
  // }

  // console.log("DAYS", allDays);
  // const allYears = [];

  // const todayYear = today.getFullYear();
  // const untilPastYear = todayYear - 120;

  // for (let i = todayYear; i >= untilPastYear; i--) {
  //   allYears.push(i);
  // }

  // console.log(allYears);

  return (
    <div>
      <div className={styles.pTagBirthDate}>Birthday:</div>
      <div className={styles.birthDateParentDivOfSelect}>
        <span className={styles.birthDateSpanTag}>
          <select
            name="Month"
            required
            className={styles.birthDateSelect}
            // className={`${styles.birthDateSelect} ${
            //   invalidBirthday ? styles.error : ""
            // }`}
            onChange={(e) => setMonth(e.target.value)}
          >
            <option label="Month" value=""></option>
            <option value="january">
                January
              </option>
            {/* {allMonths.map((month, index) => (
              <option value={index + 1} key={index}>
                {month}
              </option>
            ))} */}
          </select>
          <select
            name="Day"
            required
            className={styles.birthDateSelect}
            // className={`${styles.birthDateSelect} ${styles.dayYearSelect} ${
            //   invalidBirthday ? styles.error : ""
            // }`}
            onChange={(e) => setDay(e.target.value)}
          >
            <option label="Day" value=""></option>
            <option value="1">
                1
              </option>
            {/* {allDays.map((day, index) => (
              <option value={day} key={index + 1}>
                {day}
              </option>
            ))} */}
          </select>
          <select
            name="Year"
            required
            className={styles.birthDateSelect}
            // className={`${styles.birthDateSelect} ${styles.dayYearSelect} ${
            //   invalidBirthday ? styles.error : ""
            // }`}
            onChange={(e) => setYear(e.target.value)}
          >
            <option value="" label="Year"></option>
            <option value="2000">
                2000
              </option>
              <option value="1980">
                1980
              </option>
            {/* {allYears.map((year, index) => (
              <option value={year} key={index}>
                {year}
              </option>
            ))} */}
          </select>
        </span>
      </div>
    </div>
  );
}
