import Link from 'next/link'
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

export default function NavBar() {
    return(
        <nav className={inter.className}>
            <Link href="/">Home</Link> |{' '}
            <Link href="/about">About</Link> |{' '}
            <Link href="/contact/book">Book</Link>
        </nav>

    )
}