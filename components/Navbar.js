import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";

import styles from "./Navbar.module.css";

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
        <nav className={styles.mainNav}>
          <div
            className={
              router.pathname == "/protectedroute/post" ? "active" : ""
            }
          >
            <Link href="/protectedroute/post" legacyBehavior>
              <a className={styles.navLink}>Post</a>
            </Link>
          </div>

          <div
            className={
              router.pathname == "/protectedroute/profile" ? "active" : ""
            }
          >
            <Link href="/protectedroute/profile" legacyBehavior>
              <a className={styles.navLink}>Profile</a>
            </Link>
          </div>

          <button className={styles.logoutButton} onClick={handelLogOut}>
            Log out
          </button>
        </nav>
        <style jsx>{`
          .active {
            background-color: #3e4684;
            color: #fff;
            border-radius: 10px;
          }
        `}</style>
      </header>
      <main className={styles.mainLayout}>{children}</main>
    </>
  );
}
