const api_base_url = process.env.REACT_APP_API_BASE_URL;

const endpoints = {
    // authentication
    api_auth: `${api_base_url}api/users/api-auth/`,
    token_obtain: `${api_base_url}api/token/`,
    logout: `${api_base_url}api/logout/`,
    
    // users
    users: `${api_base_url}api/users/users/`,
    change_password: `${api_base_url}api/users/change-password/`,
    
    //posts
    posts: `${api_base_url}api/posts/posts/`,
    post_data: `${api_base_url}api/posts/post-data/`,
    comments: `${api_base_url}api/posts/comments/`,
};

export default endpoints;
