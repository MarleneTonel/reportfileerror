import { forwardRef, useEffect, useImperativeHandle, useRef, SelectHTMLAttributes } from 'react'

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
    disabled?: boolean
    isFocused?: boolean
}


export default forwardRef(function Input(
    { disabled = false, className = '', isFocused = false, ...props }: Props,
    ref
) {
    const localRef = useRef<HTMLSelectElement>(null)

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }))

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus()
        }
    }, [])

    return (
        <select
            {...props}
            disabled={disabled}
            className={
                'border-gray-300 dark:border-gray-700 dark:bg-gray-800 text-gray-900 dark:text-gray-300 placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm ' +
                className
            }
            ref={localRef}
        ></select>
    )
})
