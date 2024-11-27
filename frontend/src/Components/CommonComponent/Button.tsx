import React, { ReactNode } from "react";
import { ButtonProps, Button as FlowbiteButton } from "flowbite-react";
import { AiOutlineLoading } from "react-icons/ai";

interface CustomButtonProps extends ButtonProps {
    label: string;
    onClick?: (e: React.FormEvent<HTMLButtonElement>) => void;
    type?: "button" | "submit" | "reset";
    className?: string;
    children?: ReactNode;
    isProcessing: boolean;
}

const Button: React.FC<CustomButtonProps> = ({
    label,
    onClick,
    type = "button",
    className = "",
    isProcessing = false,
}) => {
    return (
        <FlowbiteButton
            type={type}
            onClick={onClick}
            className={`flex justify-center px-4 bg-malibu-500 text-white font-bold rounded-md hover:bg-malibu-600
               focus:outline-none focus:ring-4 focus:ring-malibu-300 ${className}`}
            color="cyan"
            isProcessing={isProcessing}
            disabled={isProcessing}
            processingSpinner={
                isProcessing ? (
                    <AiOutlineLoading className="h-6 w-6 animate-spin" />
                ) : (
                    <></>
                )
            }
        >
            {!isProcessing && label}
        </FlowbiteButton>
    );
};

export default Button;
