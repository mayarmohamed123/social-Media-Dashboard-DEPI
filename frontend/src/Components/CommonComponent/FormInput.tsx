import React from "react";

interface InputProps {
    placeholder: string;
    type: string;
    name: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    required?: boolean;
    className?: string;
}

const FormInput: React.ForwardRefExoticComponent<InputProps> = React.forwardRef<
    HTMLInputElement,
    InputProps
>(
    (
        {
            placeholder,
            type,
            name,
            value,
            onChange,
            required = false,
            className = "",
            error,
        },
        ref
    ) => {
        return (
            <div className={`flex flex-col ${className}`}>
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                    className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 ${
                        error
                            ? "focus:ring-red-500 focus:border-red-400 border-red-400   "
                            : "focus:ring-malibu-400"
                    }`}
                    ref={ref}
                />
                {true && (
                    <p className="font-bold text-sm text-red-500 ps-4">
                        {error}
                    </p>
                )}
            </div>
        );
    }
);

export default FormInput;
