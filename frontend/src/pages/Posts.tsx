import React from "react";
import Post from "../Components/Post";
import { type PostData } from "../types/posts";
import { apiRequest } from "../api/actions";
import endpoints from "../api/endpoints";
import Loading from "../Components/Loading";
import { AxiosResponse } from "axios";
import AddPost from "../Components/AddPost";

const Posts: React.FC<{ type: "Feed" | "My Posts" | "Liked Posts" }> = ({
    type,
}) => {
    const [loading, setLoading] = React.useState<boolean>(true);
    const [fetchError, setFetchError] = React.useState<string | null>(null);
    const [posts, setPosts] = React.useState<Array<PostData> | null>(null);

    let category: "feed" | "my-posts" | "liked";
    switch (type) {
        case "Feed":
            category = "feed";
            break;
        case "My Posts":
            category = "my-posts";
            break;
        case "Liked Posts":
            category = "liked";
            break;
    }

    const getPosts = () => {
        apiRequest({
            method: "get",
            endpoint: `${endpoints.posts}?category=${category}`,
            successCallback: (response?: AxiosResponse): void => {
                setPosts(response?.data);
            },
            errorCallback: () => {
                setFetchError("Error occured while loading posts");
            },
            setPost: setLoading,
        });
    };

    React.useEffect(() => {
        getPosts();
    }, [type]);

    if (loading) return <Loading />;
    if (fetchError)
        return (
            <p className="font-bold text-red-600 text-xl text-center">
                {fetchError}
            </p>
        );

    return (
        <div className="md:px-10 max-w-[650px] lg:w-full" key={type}>
            {type === "My Posts" && (
                <div className="mb-8">
                    <AddPost callback={getPosts} />
                </div>
            )}
            <h1 className="text-3xl font-bold mb-6">{type}</h1>
            <div className="space-y-4">
                {posts?.length == 0 ? (
                    <p className="font-bold text-malibu-600 text-xl">
                        {type === "Feed"
                            ? "No recent posts from others"
                            : type === "Liked Posts"
                            ? "No liked posts"
                            : "You have not posted any posts yet!"}
                    </p>
                ) : (
                    <>
                        {posts?.map((post) => (
                            <Post
                                key={post.id}
                                id={post.id}
                                url={post.url}
                                caption={post.caption}
                                date_posted={post.date_posted}
                                owner={post.owner}
                                picture={post.picture}
                                liked={post.liked}
                            />
                        ))}
                    </>
                )}
            </div>
        </div>
    );
};

export default Posts;
