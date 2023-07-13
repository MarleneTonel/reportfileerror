import { PropsWithChildren, LabelHTMLAttributes } from 'react'

const Label = ({ className, children, ...props }: PropsWithChildren<LabelHTMLAttributes<HTMLLabelElement>>) => (
    <label {...props} className={`block font-medium text-sm text-gray-500 dark:text-gray-300 ` + className}>
        {children}
    </label>
)

export default Label
