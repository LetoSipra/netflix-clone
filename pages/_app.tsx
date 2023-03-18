import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Header from "../components/Header";
import Layout from "../components/Layout";
import Banner from "../components/Banner";
import { AuthProvider } from "@/hooks/useAuth";
import { RecoilRoot } from "recoil";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Layout>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </Layout>
    </RecoilRoot>
  );
}
