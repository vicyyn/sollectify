import type { AppProps } from 'next/app'
import Head from 'next/head'
import '../globals.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Provider, Theme } from '../utils/context'
import { WalletProvider } from '../utils/wallet'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <WalletProvider>
        <Head>
          <link rel="shortcut icon" href="/sollectify.ico" />
          <title>Sollectify</title>
        </Head>
          <main className='font-primary'>
            <Theme>
              <section className='dark:bg-dark-1' >
                <Navbar />
                <Component {...pageProps} />
                <Footer />
              </section>
            </Theme>
          </main>
      </WalletProvider>
    </Provider>
  )

}

export default MyApp
