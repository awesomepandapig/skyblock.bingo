import './globals.css'
import type { Metadata } from 'next'
import { Atkinson_Hyperlegible } from 'next/font/google'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import Header from './components/Header'
import Footer from './components/Footer'
config.autoAddCss = false;

const atkinson = Atkinson_Hyperlegible({ 
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-atkinson',
})

export const metadata: Metadata = {
  title: 'skyblock.bingo',
  description: 'Skyblock.Bingo lets you view your Hypixel Skyblock bingo stats, leaderboard, and guide for this month\'s goals',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={atkinson.className}>
        <Header/>
        {children}
        <Footer/>
      </body>
    </html>
  )
}
