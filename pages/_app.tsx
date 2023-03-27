import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { AuthProvider } from "@/hooks/useAuth";
import { RecoilRoot } from "recoil";
import Head from "next/head";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Toaster />
      <Layout>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </Layout>
    </RecoilRoot>
  );
}
