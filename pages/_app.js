import { SessionProvider } from "next-auth/react";

import Navbar from "../components/Navbar";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />);
  }

  return (
    <SessionProvider session={pageProps.session}>
      <Navbar />
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
