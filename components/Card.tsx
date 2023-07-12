import { PropsWithChildren } from 'react'

const Card = ({ children }: PropsWithChildren) => (
    <div className="w-full sm:max-w-lg mt-6 px-6 py-4 primary-bg shadow-md overflow-hidden sm:rounded-lg">
        {children}
    </div>
)

export default Card
