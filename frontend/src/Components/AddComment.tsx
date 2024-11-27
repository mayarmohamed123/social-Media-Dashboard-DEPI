import React from "react";
import useUser from "../providers/UserProvider";
import Button from "./CommonComponent/Button";
import { apiRequest } from "../api/actions";
import endpoints from "../api/endpoints";
import { useNotification } from "../providers/NotificationProvider";

const AddComment: React.FC<{ postId: number; callback: Function }> = ({
    postId,
    callback,
}) => {
    const { user } = useUser();
    const { showNotification } = useNotification();
    const [post, setPost] = React.useState<boolean>(false);
    const textRef = React.useRef<HTMLTextAreaElement | null>(null);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        let comment;
        if (textRef.current) {
            comment = textRef.current.value;
            if (comment === "") return;

            apiRequest({
                method: "post",
                endpoint: endpoints.comments,
                data: { content: comment, post: postId },
                successCallback: (response) => {
                    if (textRef.current) {
                        textRef.current.value = "";
                    }
                    if (callback) callback();
                    showNotification("Your comment has been published");
                },
                errorCallback: (error) => {
                    showNotification("Error publishing your comment", true);
                    console.log(error);
                },
                setPost: setPost,
            });
        } else {
            return;
        }
    };

    return (
        <form
            className="border rounded-lg py-8 px-3 shadow-md"
            onSubmit={handleSubmit}
        >
            <div className="text flex gap-x-4">
                <img
                    src={user?.picture ?? "/user.jpg"}
                    alt=""
                    className="size-10 object-cover rounded-full"
                />
                <textarea
                    name=""
                    id=""
                    ref={textRef}
                    className="resize-y h-36 w-full focus:border-malibu-400 rounded
                    focus:ring-0 focus:outline-none"
                    placeholder="Add your comment ..."
                    required
                ></textarea>
            </div>
            <div className="mt-4 flex justify-end">
                <Button
                    label="add"
                    type="submit"
                    isProcessing={post}
                    className="min-h-[41px] w-3xl inline-block"
                />
            </div>
        </form>
    );
};

export default AddComment;
