import type { User } from "./users";

export type PostData = {
    id?: number;
    url?: string;
    caption: string;
    date_posted: string;
    owner: User;
    picture?: string;
    liked?: boolean;
};

export type CommentData = {
    id?: number;
    url?: string;
    content: string;
    date: string;
    owner: User;
    is_mine?: boolean;
};
