import React from "react";
import { HiOutlineXMark } from "react-icons/hi2";

type NotificationContextType = {
    showNotification: (message: string, error?: boolean) => void;
};

interface NotificationProviderProps {
    children: React.ReactNode;
}

const NotificationContext = React.createContext<
    NotificationContextType | undefined
>(undefined);

export const NotificationProvider = ({
    children,
}: NotificationProviderProps) => {
    const [message, setMessage] = React.useState<string | null>(null);
    const [error, setError] = React.useState<boolean>(false);
    const showNotification = (message: string, error: boolean = false) => {
        setMessage(message);
        setError(error);
        setTimeout(() => {
            setMessage(null);
            setError(false);
        }, 3000)
    };

    return (
        <NotificationContext.Provider value={{ showNotification }}>
            {children}
            {message && (
                <div
                    className={`flex justify-between fixed bottom-10 right-10 min-w-52 text-md gap-x-3
                ${error ? "bg-red-500" : "bg-green-500"} text-white rounded px-6 py-5`}
                >
                    {message}
                    <button
                        className="font-bold cursor-pointer"
                        onClick={() => {
                            setMessage(null);
                            setError(false);
                        }}
                    >
                        <HiOutlineXMark className="text-2xl font-bold" />
                    </button>
                </div>
            )}
        </NotificationContext.Provider>
    );
};

export const useNotification = () => {
    const context = React.useContext(NotificationContext);
    if (context === undefined) {
        throw new Error("Messge must be set");
    }
    return context;
};
