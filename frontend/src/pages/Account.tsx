import React from "react";
import FormInput from "../Components/CommonComponent/FormInput";
import { useForm } from "react-hook-form";
import Button from "../Components/CommonComponent/Button";
import useUser from "../providers/UserProvider";
import { apiRequest, ErrorResponse } from "../api/actions";
import ChangePassword from "../Components/ChangePassword";

interface UserDetails {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    pictures?: FileList;
}

interface SubmitData extends UserDetails {
    picture?: File;
}

const Account = () => {
    const { user } = useUser();
    const [post, setPost] = React.useState<boolean>(false);
    const [success, setSuccess] = React.useState<boolean>(false);
    const [fetchError, setFetchError] = React.useState<string | null>(null);
    const [selectedPicture, setSelectedPicture] = React.useState<File | null>(
        null
    );

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setError,
    } = useForm<UserDetails>({ defaultValues: user ?? undefined });

    const updateUserDetails = (data: UserDetails) => {
        const submitData: SubmitData = data;
        if (submitData.pictures) {
            delete submitData["pictures"];
        }
        if (selectedPicture && selectedPicture instanceof File) {
            submitData["picture"] = selectedPicture;
        } else {
            delete submitData["picture"];
        }
        setSuccess(false);
        apiRequest({
            method: "patch",
            endpoint: user!.url,
            data: submitData,
            headers: {
                "Content-Type": "multipart/form-data",
            },
            successCallback: () => {
                setSuccess(true);
            },
            errorCallback: (error) => {
                const errorResponse = error as ErrorResponse;
                if (errorResponse.response?.data) {
                    for (const errorField in errorResponse.response.data) {
                        setError(errorField as keyof UserDetails, {
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

    const pictures = watch("pictures");
    React.useEffect(() => {
        if (pictures && pictures.length > 0) {
            setSelectedPicture(pictures[0]);
        } else {
            setSelectedPicture(null);
        }
    }, [pictures]);

    return (
        <div className="md:px-10 max-w-[650px] lg:w-full">
            <h1 className="text-3xl font-bold mb-3">My Account</h1>
            <br />

            <h2 className="text-xl font-bold mb-3">User details:</h2>
            <form
                className="space-y-4"
                onSubmit={handleSubmit(updateUserDetails)}
            >
                <div className="flex flex-wrap gap-x-4 gap-y-4 justify-between">
                    <FormInput
                        placeholder="First Name"
                        type="text"
                        className="w-full md:w-[45%]"
                        {...register("first_name", {
                            required: "enter your first name",
                        })}
                        error={errors.first_name?.message}
                    />
                    <FormInput
                        placeholder="Last Name"
                        type="text"
                        className="w-full md:w-[45%]"
                        {...register("last_name", {
                            required: "enter your last name",
                        })}
                        error={errors.last_name?.message}
                    />
                </div>
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

                <div className="">
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
                    label="Save Changes"
                    type="submit"
                    isProcessing={post}
                    className="min-h-[41px] w-3xl inline-block"
                />
                {success && (
                    <span className="text-malibu-600 font-bold text-sm ms-2">
                        Saved Successfully
                    </span>
                )}
            </form>
            <div className="mt-8">
                <ChangePassword />
            </div>
        </div>
    );
};

export default Account;
