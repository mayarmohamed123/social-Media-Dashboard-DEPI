import React from "react";
import Post from "../Components/Post";
import Comment from "../Components/Comment";
import AddComment from "../Components/AddComment";
import { Link, useParams } from "react-router-dom";
import { CommentData, PostData } from "../types/posts";
import Loading from "../Components/Loading";
import { apiRequest, ErrorResponse } from "../api/actions";
import endpoints from "../api/endpoints";

const PostPage = () => {
    const { postId } = useParams<{ postId: string }>();

    const [loading, setLoading] = React.useState<boolean>(true);
    const [fetchError, setFetchError] = React.useState<string | null>(null);
    const [post, setPost] = React.useState<PostData | null>(null);
    const [comments, setComments] = React.useState<CommentData[] | null>(null);

    const getPostData = () => {
        apiRequest({
            method: "get",
            endpoint: `${endpoints.post_data}?post=${postId}`,
            successCallback: (response) => {
                setPost(response?.data.post);
                setComments(response?.data.comments);
                setLoading(false);
            },
            errorCallback: (error: ErrorResponse) => {
                if (error.response?.data?.detail) {
                    setFetchError(error.response.data.detail);
                } else {
                    setFetchError("Error occured while loading post");
                }
                setLoading(false);
            },
        });
    };

    React.useEffect(() => {
        getPostData();
    }, []);

    if (loading) return <Loading />;
    if (fetchError)
        return (
            <>
                <p className="font-bold text-red-600 text-xl text-center">
                    {fetchError}
                </p>
                <Link
                    to={"/"}
                    className="p-6 h-8 bg-malibu-400 flex items-center justify-center rounded-xl text-white border-2
                border-malibu-400 hover:bg-transparent hover:text-malibu-400 max-w-20 m-auto mt-4"
                >
                    Home
                </Link>
            </>
        );

    return (
        <div className="md:px-8 lg:px-10 max-w-[650px] lg:w-full">
            {post ? (
                <>
                    <Post
                        url={post.url}
                        caption={post.caption}
                        id={post.id}
                        date_posted={post.date_posted}
                        owner={post.owner}
                        picture={post.picture}
                        liked={post.liked}
                    />
                    <h1 className="text-2xl font-bold mt-10">
                        {comments!.length > 0
                            ? "Recent Comments:"
                            : "Be the first to comment:"}
                    </h1>
                    <div className="comments mt-8 flex flex-col gap-y-10">
                        {comments!.map((comment) => (
                            <Comment
                                key={comment.id}
                                url={comment.url}
                                content={comment.content}
                                date={comment.date}
                                owner={comment.owner}
                                is_mine={comment.is_mine}
                                callback={getPostData}
                            />
                        ))}
                    </div>
                    <br />
                    {/* <h1 className="text-2xl font-bold mt-10 mb-8">
                        Add Comment:{" "}
                    </h1> */}
                    <AddComment postId={post.id!} callback={getPostData} />
                </>
            ) : (
                <Loading />
            )}
        </div>
    );
};

export default PostPage;
