/*Añadimos las fuentes*/
import { Roboto } from 'next/font/google' 
import  './globals.css'
import NavBar from '@/components/NavBar'

export const metadata = {
  title: 'My App',
  description: 'Aprendiendo Next.js',
}
const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
})

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <NavBar />
        {children}
      </body>
    </html>
  )
}
