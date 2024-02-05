import { Footer } from '@/components/Footer'
import Header from '@/components/Header'
import { AppContextProvider } from '@/context/AppContext'
import '@/styles/global.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppContextProvider>
      <Header />
        <Component {...pageProps} />
      <Footer />
    </AppContextProvider>
  )
}
