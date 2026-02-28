import type { AppProps } from 'next/app'
import { Geist, Geist_Mono } from 'next/font/google'
import 'nextra-theme-docs/style.css'
import '../styles/globals.css'

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
  display: 'swap',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style>{`
        :root {
          --font-sans: ${geist.style.fontFamily};
          --font-mono: ${geistMono.style.fontFamily};
        }
        html {
          font-family: ${geist.style.fontFamily}, ui-sans-serif, system-ui, sans-serif;
        }
        code, kbd, pre {
          font-family: ${geistMono.style.fontFamily}, ui-monospace, monospace;
        }
      `}</style>
      <Component {...pageProps} />
    </>
  )
}
