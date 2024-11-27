import React from "react";
import FormInput from "./CommonComponent/FormInput";
import Button from "./CommonComponent/Button";
import { useForm } from "react-hook-form";
import { apiRequest, ErrorResponse } from "../api/actions";
import endpoints from "../api/endpoints";

interface PasswordForm {
    current_password: string;
    new_password: string;
    confirm_new_password: string;
}

const ChangePassword = () => {
    const [post, setPost] = React.useState<boolean>(false);
    const [success, setSuccess] = React.useState<boolean>(false);
    const [fetchError, setFetchError] = React.useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setError,
        clearErrors,
        reset,
    } = useForm<PasswordForm>();

    const onSubmit = (data: PasswordForm) => {
        setSuccess(false);
        apiRequest({
            method: "post",
            endpoint: endpoints.change_password,
            data: data,
            successCallback: () => {
                setSuccess(true);
                clearErrors();
                reset();
            },
            errorCallback: (error) => {
                const errorResponse = error as ErrorResponse;
                if (errorResponse.response?.data) {
                    for (const errorField in errorResponse.response.data) {
                        setError(errorField as keyof PasswordForm, {
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

    return (
        <>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <h2 className="text-xl font-bold">Password</h2>
                <FormInput
                    placeholder="Current Password"
                    type="password"
                    {...register("current_password", {
                        required: "enter your current password",
                    })}
                    error={errors.current_password?.message}
                />
                <FormInput
                    placeholder="New Password"
                    type="password"
                    {...register("new_password", {
                        required: "enter new password",
                    })}
                    error={errors.new_password?.message}
                />
                <FormInput
                    placeholder="Confirm New Password"
                    type="password"
                    {...register("confirm_new_password", {
                        required: "enter password confirm",
                    })}
                    error={errors.confirm_new_password?.message}
                />

                {fetchError && (
                    <p className="font-bold text-sm text-red-600 text-center">
                        {fetchError}
                    </p>
                )}

                <Button
                    label="Update Password"
                    type="submit"
                    isProcessing={post}
                    className="min-h-[41px] w-3xl inline-block"
                />
                {success && (
                    <span className="text-malibu-600 font-bold text-sm ms-2">
                        Password Changed Successfully
                    </span>
                )}
            </form>
        </>
    );
};

export default ChangePassword;
