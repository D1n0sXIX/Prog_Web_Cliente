import  './globals.css'
import NavBar from '@/components/NavBar'

export const metadata = {
  title: 'My App',
  description: 'Aprendiendo Next.js',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        {children}
      </body>
    </html>
  )
}
