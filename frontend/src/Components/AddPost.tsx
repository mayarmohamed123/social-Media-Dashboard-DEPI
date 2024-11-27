import React, { useState } from "react";
import { HiOutlineXMark } from "react-icons/hi2";
import Button from "./CommonComponent/Button";
import { apiRequest } from "../api/actions";
import endpoints from "../api/endpoints";
import { useNotification } from "../providers/NotificationProvider";

interface AddPostProps {
    callback?: Function;
}

const AddPost: React.FC<AddPostProps> = ({ callback }) => {
    const [caption, setCaption] = useState<string>("");
    const [picture, setPicture] = useState<File | null>(null);
    const [post, setPost] = React.useState<boolean>(false);
    const textRef = React.useRef<HTMLTextAreaElement | null>(null);
    const { showNotification } = useNotification();

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        if (file) {
            setPicture(file);
        }
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        apiRequest({
            method: "post",
            endpoint: endpoints.posts,
            data: {
                caption: caption,
                picture: picture,
            },
            headers: {
                "Content-Type": "multipart/form-data",
            },
            successCallback: () => {
                showNotification("Post has been published");
                if (textRef.current) {
                    textRef.current.value = "";
                }
                setPicture(null);
                if (callback) callback();
            },
            errorCallback: () => {
                showNotification("Error publishing your post!", true);
            },
            setPost: setPost,
        });
    };

    return (
        <>
            <h1 className="text-3xl font-bold mb-6">Add Post</h1>
            <div className="border p-4 mx-auto bg-white shadow-md rounded-md">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <textarea
                            name=""
                            id=""
                            ref={textRef}
                            className="resize-y h-36 w-full focus:border-malibu-400 rounded-md
                        focus:ring-0 focus:outline-none"
                            placeholder="What's on your mind?"
                            required={!picture}
                            onChange={(event) => {
                                setCaption(event.target.value);
                            }}
                        ></textarea>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Upload Image (Optional)
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            className="block w-full text-sm text-gray-500 border border-gray-300 rounded-lg
                            cursor-pointer bg-gray-50 focus:outline-none mt-2"
                            onChange={handleImageUpload}
                        />
                    </div>

                    {picture && (
                        <div className="relative mb-4">
                            <img
                                src={URL.createObjectURL(picture)}
                                alt="Uploaded Preview"
                                className="w-full h-auto object-cover rounded-md"
                            />
                            <button
                                type="button"
                                className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full hover:bg-red-800"
                                onClick={() => {
                                    setPicture(null);
                                }}
                            >
                                <HiOutlineXMark className="text-xl font-bold" />
                            </button>
                        </div>
                    )}

                    <div className="mt-4 flex justify-end">
                        <Button
                            label="Post"
                            isProcessing={post}
                            type="submit"
                            className="min-h-[41px] px-4"
                        />
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddPost;
