import {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
    InputHTMLAttributes,
} from "react";
import { PhotoIcon } from "@heroicons/react/24/solid";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    disabled?: boolean;
    isFocused?: boolean;
}

export default forwardRef(function FileInput(
    { disabled = false, className = "", isFocused = false, ...props }: Props,
    ref
) {
    const localRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, []);

    return (
        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 dark:border-gray-200/25 px-6 py-10">
            <div className="text-center">
                <PhotoIcon
                    className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-500"
                    aria-hidden="true"
                />
                <div className="mt-4 flex text-sm leading-6 text-gray-600 dark:text-white">
                    <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md primary-bg font-semibold text-indigo-600 dark:text-white focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                        <span>Adicione um arquivo</span>
                        <input
                            {...props}
                            ref={localRef}
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                        />
                    </label>
                    <p className="pl-1 dark:text-gray-400">ou arraste e solte</p>
                </div>
                <p className="text-xs leading-5 text-gray-600 dark:text-gray-400">
                    PNG, JPG, PDF de até 10MB
                </p>
            </div>
        </div>
    );
});
