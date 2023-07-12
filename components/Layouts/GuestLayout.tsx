import { PropsWithChildren } from 'react'
import Head from 'next/head'

const GuestLayout = ({ children }: PropsWithChildren) => {
    return (
        <div>
            <Head>
                <title>iDocumentos</title>
            </Head>

            <div className="font-sans text-gray-900 dark:text-white antialiased">
                {children}
            </div>
        </div>
    )
}

export default GuestLayout
