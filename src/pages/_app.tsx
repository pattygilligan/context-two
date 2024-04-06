import { type AppType } from "next/app";
import { Inter } from "next/font/google";
import UserProvider from "~/contexts/UserContext";

import "~/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <UserProvider>
      <main className={`font-sans ${inter.variable}`}>
        <Component {...pageProps} />
      </main>
    </UserProvider>
  );
};

export default MyApp;
