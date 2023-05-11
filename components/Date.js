import React, { useState } from "react";
import moment from "moment";

import styles from "../styles/Home.module.css";

export default function Date() {
  const allMonths = moment.months();

  const allDays = [];

  for (let i = 1; i <= 31; i++) {
    allDays.push(i);
  }

  console.log("DAYS", allDays);

  const allYears = [];

  const todayYear = today.getFullYear();
  const untilPastYear = todayYear - 120;

  for (let i = todayYear; i >= untilPastYear; i--) {
    allYears.push(i);
  }

  console.log(allYears);

  return (
    <div>
      <div className={styles.pTagBirthDate}>Birthday:</div>
      <div className={styles.birthDateParentDivOfSelect}>
        <span className={styles.birthDateSpanTag}>
          <select
            name="Month"
            required
            className={`${styles.birthDateSelect} ${
              invalidBirthday ? styles.error : ""
            }`}
            onChange={monthHandler}
          >
            <option label="Month" value=""></option>
            {allMonths.map((month, index) => (
              <option value={index + 1} key={index}>
                {month}
              </option>
            ))}
          </select>
          <select
            name="Day"
            required
            className={`${styles.birthDateSelect} ${styles.dayYearSelect} ${
              invalidBirthday ? styles.error : ""
            }`}
            onChange={dayHandler}
          >
            <option label="Day" value=""></option>
            {allDays.map((day, index) => (
              <option value={day} key={index + 1}>
                {day}
              </option>
            ))}
          </select>
          <select
            name="Year"
            required
            className={`${styles.birthDateSelect} ${styles.dayYearSelect} ${
              invalidBirthday ? styles.error : ""
            }`}
            onChange={yearHandler}
          >
            <option value="" label="Year"></option>
            {allYears.map((year, index) => (
              <option value={year} key={index}>
                {year}
              </option>
            ))}
          </select>
        </span>
      </div>
    </div>
  );
}
