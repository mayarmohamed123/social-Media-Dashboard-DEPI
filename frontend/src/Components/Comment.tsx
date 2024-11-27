import React from "react";
import type { CommentData } from "../types/posts";
import { MdDelete } from "react-icons/md";
import { AiOutlineLoading } from "react-icons/ai";
import { apiRequest } from "../api/actions";
import { useNotification } from "../providers/NotificationProvider";

const Comment: React.FC<CommentData & { callback: Function }> = ({
    url,
    content,
    date,
    owner,
    is_mine,
    callback,
}) => {
    const [post, setPost] = React.useState<boolean>(false);
    const { showNotification } = useNotification();

    const handleDelete = () => {
        apiRequest({
            method: "delete",
            endpoint: url!,
            successCallback: () => {
                showNotification("Comment has been deleted");
                if (callback) callback();
            },
            errorCallback: (error) => {
                showNotification("Error deleting your comment", true);
                console.log(error);
            },
            setPost: setPost,
        });
    };

    return (
        <div>
            {/* Comment Owner */}
            <div className="flex gap-x-2 items-center relative">
                {is_mine && (
                    <button
                        className="absolute right-4 w-14 h-10 rounded-md bg-transparent border-2 border-red-600
                flex items-center justify-center text-red-600 text-xl hover:bg-red-600 hover:text-white cursor-pointer"
                        disabled={post}
                    >
                        {post ? (
                            <AiOutlineLoading className="h-6 w-6 animate-spin" />
                        ) : (
                            <MdDelete onClick={handleDelete} />
                        )}
                    </button>
                )}
                <div className="img">
                    <img
                        src={owner.picture ?? "/user.jpg"}
                        alt={owner.full_name}
                        className="size-10 rounded-full object-cover"
                    />
                </div>
                <div className="name">
                    <span className="font-bold">{owner.full_name}</span>
                    <br />
                    <span className="text-sm text-gray-400">{date}</span>
                </div>
            </div>

            {/* Content */}
            <p className="text-gray-700 ps-2 mt-2">{content}</p>
            <div className="sep h-[1px] bg-black m-auto w-3/4 mt-4"></div>
        </div>
    );
};

export default Comment;
