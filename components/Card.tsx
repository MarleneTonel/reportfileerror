import { PropsWithChildren } from 'react'

const Card = ({ children }: PropsWithChildren) => (
    <div className="w-full md:max-w-xl mt-6 px-6 py-4 primary-bg shadow-md overflow-hidden sm:rounded-lg">
        {children}
    </div>
)

export default Card
