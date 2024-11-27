import React from "react";
import FormInput from "../Components/CommonComponent/FormInput";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Button from "../Components/CommonComponent/Button";
import endpoints from "../api/endpoints";
import { apiRequest, ErrorResponse } from "../api/actions";
import Loading from "../Components/Loading";
import { checkAuth } from "../utils";

interface FormData {
    first_name: string;
    last_name: string;
    email: string;
    phone: string
    password: string;
    password2: string;
    pictures?: FileList;
}

interface SubmitData extends FormData {
    picture?: File;
}

const SignUp: React.FC = () => {
    const [post, setPost] = React.useState<boolean>(false);
    const [disabled, setDisabled] = React.useState<boolean>(false);
    const [pageLoading, setPageLoading] = React.useState<boolean>(true);
    const [fetchError, setFetchError] = React.useState<string | null>(null);
    const [selectedPicture, setSelectedPicture] = React.useState<File | null>(
        null
    );
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setError,
        clearErrors,
    } = useForm<FormData>();

    const password = watch("password");
    const password2 = watch("password2");
    const pictures = watch("pictures");

    const onSubmit = (data: FormData) => {
        if (password !== password2) {
            setError("password2", { message: "Password doesn't match" });
            return;
        }

        const submitData: SubmitData = data;
        if (submitData.pictures) {
            delete submitData["pictures"];
        }
        if (selectedPicture) {
            submitData["picture"] = selectedPicture;
        }

        apiRequest({
            method: "post",
            endpoint: endpoints.users,
            data: submitData,
            headers: {
                "Content-Type": "multipart/form-data",
            },
            successCallback: () => {
                // login after user creation
                apiRequest({
                    method: "post",
                    endpoint: endpoints.token_obtain,
                    data: {
                        email: data.email,
                        password: data.password,
                    },
                    successCallback: () => {
                        navigate("/");
                    },
                    setPost: setDisabled,
                });
            },
            errorCallback: (error) => {
                const errorResponse = error as ErrorResponse;
                if (errorResponse.response?.data) {
                    for (const errorField in errorResponse.response.data) {
                        setError(errorField as keyof FormData, {
                            message: errorResponse.response.data[errorField],
                        });
                    }
                } else {
                    setFetchError(errorResponse.response?.data?.detail);
                }
            },
            setPost: setPost,
        });
    };

    React.useEffect(() => {
        if (pictures && pictures.length > 0) {
            setSelectedPicture(pictures[0]);
        } else {
            setSelectedPicture(null);
        }
    }, [pictures]);

    React.useEffect(() => {
        if (password2) {
            if (password !== password2) {
                setError("password2", {
                    message: "password doesn't match",
                });
            } else {
                clearErrors("password2");
            }
        }
    }, [password, password2]);
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
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <div className="bg-white shadow-xl rounded-lg p-10 w-full max-w-2xl">
                <h2 className="text-3xl font-bold mb-6 text-center text-malibu-500">
                    Create Your Account
                </h2>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-wrap justify-between max-md:grid-cols-1 grid-cols-2 gap-6 mb-6">
                        <FormInput
                            placeholder="First Name"
                            type="text"
                            className="w-full md:w-[47%]"
                            {...register("first_name", {
                                required: "enter your first name",
                            })}
                            error={errors.first_name?.message}
                        />
                        <FormInput
                            placeholder="Last Name"
                            type="text"
                            className="w-full md:w-[47%]"
                            {...register("last_name", {
                                required: "enter your last name",
                            })}
                            error={errors.last_name?.message}
                        />
                        <FormInput
                            placeholder="Email"
                            type="text"
                            className="w-full"
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
                            placeholder="Phone"
                            type="text"
                            className="w-full"
                            {...register("phone", {
                                pattern: {
                                    value: /^[0-9]+$/,
                                    message: "Enter a valid phone number",
                                },
                            })}
                            error={errors.phone?.message}
                        />
                    </div>

                    <div className="grid max-md:grid-cols-1 grid-cols-2 gap-6 mb-6">
                        <FormInput
                            placeholder="Password"
                            type="password"
                            {...register("password", {
                                required: "enter your password",
                            })}
                            error={errors.password?.message}
                        />
                        <FormInput
                            placeholder="Confirm Password"
                            type="password"
                            {...register("password2", {
                                required: "enter your password",
                            })}
                            error={errors.password2?.message}
                        />
                    </div>

                    <div className="mb-6">
                        <input
                            type="file"
                            accept="image/*"
                            className="block w-full text-sm text-gray-500 border border-gray-300 rounded-lg
                            cursor-pointer bg-gray-50 focus:outline-none"
                            {...register("pictures")}
                        />
                        {selectedPicture && (
                            <div className="mt-4">
                                <img
                                    src={URL.createObjectURL(selectedPicture)}
                                    alt="Profile Preview"
                                    className="w-32 h-32 rounded-full object-cover mb-4 border border-gray-300"
                                />
                            </div>
                        )}
                    </div>

                    {fetchError && (
                        <p className="font-bold text-sm text-red-600 text-center">
                            {fetchError}
                        </p>
                    )}

                    <Button
                        label="Sign Up"
                        type="submit"
                        isProcessing={post || disabled}
                        className="min-h-[41px] w-full"
                    />
                </form>
                <div className="text-sm mt-2 text-gray-500 font-bold">
                    Already have account?{" "}
                    <Link className="underline text-malibu-600" to={"/login"}>
                        login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
