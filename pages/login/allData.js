import Link from "next/link";

import styles from "../../styles/Home.module.css";

function AllData() {
  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   console.log(token);

  //   restapi
  //     .get("/alldata")
  //     .then((response) => {
  //       console.log("Authenticaion successful!");
  //     })
  //     .catch((e) => {
  //       console.log(e, "Error! (Frontend alldata)");
  //     });
  // }, []);

  return (
    <div>
      <div className={styles.mainNav}>
        <Link href="/login/allData">
          <a className={styles.navText}>All Data</a>
        </Link>
        <Link href="/signup">
          <a className={styles.navText}>Sign up</a>
        </Link>
        <Link href="/">
          <a className={styles.navText}>Log out</a>
        </Link>
      </div>
      <h1>All data</h1>
      {/* {data.map((d) => (
        <ul key={d._id}>
          <li>{d.title}</li>
          <li>{d.description}</li>
        </ul>
      ))} */}
    </div>
  );
}

export default AllData;
