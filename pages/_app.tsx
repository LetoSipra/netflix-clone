import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Header from './components/Header'
import Layout from './components/Layout'
import Banner from './components/Banner'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
    <Header />
    <Layout>
    <Component {...pageProps} />
    </Layout>
    </>
  )
}
