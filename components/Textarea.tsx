import { forwardRef, useEffect, useImperativeHandle, useRef, InputHTMLAttributes } from 'react'

interface Props extends InputHTMLAttributes<HTMLTextAreaElement> {
    disabled?: boolean
    isFocused?: boolean
}


export default forwardRef(function Textarea(
    { disabled = false, className = '', isFocused = false, ...props }: Props,
    ref
) {
    const localRef = useRef<HTMLTextAreaElement>(null)

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }))

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus()
        }
    }, [])

    return (
        <textarea
            {...props}
            disabled={disabled}
            className={
                'border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm ' +
                className
            }
            ref={localRef}
        ></textarea>
    )
})
