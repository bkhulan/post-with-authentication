import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";

import styles from "./Navbar.module.css";
import homeStyles from "../styles/Home.module.css";

export default function Layout({ children }) {
  const router = useRouter();

  const handelLogOut = async () => {
    const res = await axios.get("/api/requests/logout");
    console.log("user === ", res);
    if (res.status === 200) {
      router.push("/login");
    }
  };

  return (
    <>
      <header className={styles.mainHeader}>
        <div>
          <h3 className={`${homeStyles.title} ${styles.navTitle}`}>Dream</h3>
        </div>
        <nav className={styles.navTagLinks}>
          <ul className={styles.ulTagLinks}>
            <li
              className={styles.liTagLinks}             
            >
              <Link
                href="/protectedroute/addpost"
                className={`${styles.aTagLink} ${
                  router.pathname == "/protectedroute/addpost"
                    ? styles.active
                    : ""
                }`}
              >
                Post
              </Link>
              <ul className={styles.dropdownUlTag}>            
                <li className={styles.dropdownLiTag}>
                  <Link
                    href="/protectedroute/addpost"
                    className={styles.dropdownATag}
                  >
                    Add post
                  </Link>
                </li>
                <li className={styles.dropdownLiTag}>
                  <Link
                    href="/protectedroute/allposts"
                    className={styles.dropdownATag}
                  >
                    All posts
                  </Link>
                </li>
              </ul>
            </li>

            <li
              className={styles.liTagLinks}            
            >
              <Link
                href="/protectedroute/profile"
                className={`${styles.aTagLink} ${
                  router.pathname == "/protectedroute/profile"
                    ? styles.active
                    : ""
                }`}
              >
                Profile
              </Link>
            </li>
          </ul>
        </nav>
        <div className={styles.divLogoutButton}>
          <button className={styles.logoutButton} onClick={handelLogOut}>
            Log out
          </button>
        </div>
        {/* <style jsx>{``}</style> */}
      </header>
    </>
  );
}
