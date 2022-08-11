import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function MyApp({ Component, pageProps }: AppProps) {
  // check if it in SSR or not
  const [ssr, setSsr] = useState(true);
  useEffect(() => {
    //code execute inside react client side render
    setSsr(false);
  }, []);
  //if in SSR return nothing
  if (ssr) return null;
  return (
      <GoogleOAuthProvider clientId={`${process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN}`}>
        <div className="xl:w-[1300px] m-auto overflow-hidden h-[100vh]">
        <Navbar />
        <div className="flex gap-10 h-[92vh]">
          {/* sidebar section start */}
          <div className="overflow-hidden xl:hover:overflow-auto">
            <Sidebar />
          </div>
          {/* main content section start */}
          <div className="flex flex-col gap-10 mt-4 overflow-auto flex-1">
            <Component {...pageProps} />
          </div>
        </div>
</div>
      </GoogleOAuthProvider>
  );
}

export default MyApp;
