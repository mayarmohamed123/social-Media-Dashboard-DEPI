import React from "react";
import { FaHeart } from "react-icons/fa6";
import { VscCommentDiscussion } from "react-icons/vsc";
import { RiExternalLinkLine } from "react-icons/ri";
import { Link, useParams } from "react-router-dom";
import { type PostData } from "../types/posts";
import { apiRequest } from "../api/actions";

const Post: React.FC<PostData> = ({
    id,
    url,
    caption,
    date_posted,
    owner,
    picture,
    liked = false,
}) => {
    const { postId } = useParams<{ postId: string }>();

    const isPostPage = postId === String(id);
    const [isLiked, setIsLiked] = React.useState<boolean>(liked);

    const handleLike = () => {
        apiRequest({
            method: "post",
            endpoint: `${url}like/`,
            successCallback: (response) => {
                setIsLiked(!isLiked);
            },
        });
    };

    return (
        <div className="border p-4 rounded-xl relative">
            {!isPostPage && (
                <Link
                    to={`/post/${id}`}
                    className="absolute right-4 w-14 h-10 rounded-md bg-transparent border-2 border-malibu-600
            flex items-center justify-center text-malibu-600 text-xl hover:bg-malibu-600 hover:text-white cursor-pointer"
                >
                    <RiExternalLinkLine />
                </Link>
            )}
            <h2 className="text-xl font-semibold flex gap-x-2 items-center">
                <img
                    src={owner.picture ?? "/user.jpg"}
                    alt=""
                    className="size-8 object-cover rounded-full"
                />
                <span>{owner.full_name}</span>
            </h2>
            <span className="inline-block text-sm ms-10 text-gray-400">
                {date_posted}
            </span>
            <p className="text-gray-700 my-4">{caption}</p>
            {picture && (
                <div className="max-h-96 overflow-hidden">
                    <img src={picture} className="w-full object-contain" />
                </div>
            )}
            <div className="actions mt-4 text-2xl flex gap-x-4">
                <FaHeart
                    className={`hover:text-gray-600 hover:fill-gray-600 cursor-pointer ${
                        isLiked && "fill-red-600"
                    } active:animate-bounce`}
                    onClick={handleLike}
                />
                {!isPostPage && (
                    <Link to={`/post/${id}`}>
                        <VscCommentDiscussion className="hover:text-malibu-600 cursor-pointer" />
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Post;
