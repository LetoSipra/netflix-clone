import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Header from './components/Header'
import Layout from './components/Layout'
import Banner from './components/Banner'
import { AuthProvider } from '@/custom_hooks/useAuth'
import { RecoilRoot } from 'recoil'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
    <AuthProvider>
    <Layout>
    <Component {...pageProps} />
    </Layout>
    </AuthProvider>
    </RecoilRoot>
  )
}
