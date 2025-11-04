import Link from 'next/link'

export const metadata = {
    title: "Contacto",
}

export default function Booklayout({children}) {
    return (
        <>
            <nav>
                <h3>Seccion Contacto</h3>
                <ul>
                    <li>
                        <Link href="/contact/book">Book</Link>
                    </li>
                    <li>
                        <Link href="/contact/book/info">Info</Link>
                    </li>
                </ul>
            </nav>
            {children}
        </>
    )
}