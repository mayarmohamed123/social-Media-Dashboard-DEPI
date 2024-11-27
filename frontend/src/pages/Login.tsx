import React from "react";
import Button from "../Components/CommonComponent/Button";
import FormInput from "../Components/CommonComponent/FormInput";
import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "../api/axiosInstance";
import endpoints from "../api/endpoints";
import Loading from "../Components/Loading";
import { checkAuth } from "../utils";

type FormData = { email: string; password: string };

const Login: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();

    const navigate = useNavigate();

    const [pageLoading, setPageLoading] = React.useState<boolean>(true);
    const [post, setPost] = React.useState<boolean>(false);
    const [fetchError, setFetchError] = React.useState<string | null>(null);

    const onSubmit: SubmitHandler<FormData> = (data) => {
        setPost(true);
        axios
            .post(endpoints.token_obtain, data)
            .then((response) => {
                navigate("/");
            })
            .catch((error) => {
                setFetchError(
                    error.response?.data?.detail ||
                        "Incorrect email or password!"
                );
            })
            .finally(() => {
                setPost(false);
            });
    };

    const isAuthenticated = async () => {
        const isAuthenticated = await checkAuth();
        if (isAuthenticated) {
            navigate("/logout");
        } else {
            setPageLoading(false);
        }
    };

    React.useEffect(() => {
        isAuthenticated();
    }, []);

    if (pageLoading) return <Loading />;

    return (
        <div className="min-h-screen flex justify-center items-center">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
                <h2 className="text-2xl font-bold mb-4 text-center text-malibu-500">
                    Login to Your Account
                </h2>
                <form onSubmit={handleSubmit(onSubmit)} className=" grid gap-6">
                    <FormInput
                        placeholder="Enter your email"
                        type="text"
                        {...register("email", {
                            required: "enter your email",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Enter a valid email address",
                            },
                        })}
                        error={errors.email?.message}
                    />
                    <FormInput
                        placeholder="Enter your password"
                        type="password"
                        {...register("password", {
                            required: "enter your password",
                        })}
                        error={errors.password?.message}
                    />

                    {fetchError && (
                        <p className="font-bold text-sm text-red-600 text-center">
                            {fetchError}
                        </p>
                    )}

                    <Button
                        label="Login"
                        type="submit"
                        isProcessing={post}
                        className="min-h-[41px]"
                    />
                </form>
                <div className="text-sm mt-2 text-gray-500 font-bold">
                    Don't have account?{" "}
                    <Link className="underline text-malibu-600" to={"/signup"}>
                        create account
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
